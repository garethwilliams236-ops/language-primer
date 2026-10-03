"use client";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { LANGUAGES, clean, getCourse, shuffle, wkey } from "@/lib/course";
import { LEVELS } from "@/lib/levels";
import { buildQuiz } from "@/lib/quiz";
import { speech } from "@/lib/speech";
import { api, supabase } from "@/lib/supabase";
import * as store from "@/lib/store";
import { PlayIcon, Rich, Ru } from "@/lib/text";
import type { LangConfig, Lesson, QuizState, ReaderText, Tab } from "@/lib/types";

/* ---------- small helpers ---------- */
function readPref<T>(k: string, d: T): T {
  try { const v = localStorage.getItem("primer-" + k); return v === null ? d : (JSON.parse(v) as T); } catch { return d; }
}
function writePref(k: string, v: unknown) { try { localStorage.setItem("primer-" + k, JSON.stringify(v)); } catch {} }

type Gloss = Record<string, { lemma: string; en: string; note: string }>;
type Reading = { t: ReaderText; g: Gloss; shown: Set<number>; explain: Record<number, string>; sel: { si: number; w: string } | null; confirmDel: boolean };
type Card = { ru: string; en: string; pron?: string; extra?: string; from: string };

const STEP_DESC: Record<string, string> = {
  learn: "Read a short explanation", listen: "Hear each item and say it aloud", examples: "See it in real sentences",
  practice: "Check yourself with a short quiz", recap: "The key points to remember",
};
function stepsFor(l: Lesson) {
  const s = [{ k: "goal", n: "Goal" }, { k: "learn", n: "Learn" }];
  if (l.items.length) s.push({ k: "listen", n: "Listen" });
  if (l.examples.length) s.push({ k: "examples", n: "Examples" });
  s.push({ k: "practice", n: "Practice" }, { k: "recap", n: "Recap" });
  return s;
}
function errCopy(code: string) {
  switch (code) {
    case "too_long": return "That's more than 3,000 characters. Paste about a page at a time.";
    case "invalid_json": return "That text came back incomplete. Try a shorter passage.";
    case "rate_limited": return "Claude is busy or a usage limit was reached. Try again in a minute.";
    case "not_configured": return "Claude isn't set up yet: add ANTHROPIC_API_KEY in Vercel.";
    case "not_signed_in": return "Your sign-in has expired. Sign out and back in.";
    case "empty": return "Add some text, a photo or a topic first.";
    default: return "Something went wrong. Try again.";
  }
}
async function imageToBase64(file: File): Promise<{ media_type: string; data: string }> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1568 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  const url = c.toDataURL("image/jpeg", 0.85);
  return { media_type: "image/jpeg", data: url.split(",")[1] };
}

/* ---------- the app ---------- */
export default function Primer({ email }: { email: string }) {
  const [lang, setLangState] = useState<string>("ru");
  const course = useMemo(() => getCourse(lang), [lang]);
  const { L, tabs, all } = course;
  const [tab, setTab] = useState("alphabet");
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [progress, setProgress] = useState<store.Progress>({});
  const [texts, setTexts] = useState<ReaderText[] | null>(null);
  const [words, setWords] = useState<store.SavedWord[] | null>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [dataErr, setDataErr] = useState("");
  const [slow, setSlow] = useState(false);
  const [pron, setPron] = useState(true);
  const [voicePref, setVoicePref] = useState(true);
  const [rmode, setRmode] = useState("tap");
  const [rlevel, setRlevel] = useState("A1");
  const [, refresh] = useReducer((x: number) => x + 1, 0);
  const lesson = lessonId ? all.find((l) => l.id === lessonId) || null : null;

  /* load prefs once */
  useEffect(() => {
    setLangState(readPref("lang", "ru")); setTab(readPref("tab", "alphabet"));
    setSlow(readPref("slow", false)); setPron(readPref("pron", true)); setVoicePref(readPref("eleven", true));
    setRmode(readPref("rmode", "tap")); setRlevel(readPref("rlevel", "A1"));
    speech.init();
    const un = speech.subscribe(refresh);
    fetch("/api/tts").then((r) => r.json()).then((j) => { speech.elevenAvailable = !!j.enabled; refresh(); }).catch(() => {});
    return () => { un(); };
  }, []);
  useEffect(() => { speech.slow = slow; writePref("slow", slow); }, [slow]);
  useEffect(() => { speech.preferEleven = voicePref; writePref("eleven", voicePref); refresh(); }, [voicePref]);
  useEffect(() => { writePref("pron", pron); }, [pron]);
  useEffect(() => { writePref("rmode", rmode); }, [rmode]);
  useEffect(() => { writePref("rlevel", rlevel); }, [rlevel]);
  useEffect(() => { writePref("tab", tab); }, [tab]);

  /* per-language data */
  useEffect(() => {
    writePref("lang", lang);
    speech.setLang(L.code, L.tts, L.voiceRe);
    setProgress({}); setTexts(null); setWords(null); setDataErr("");
    let live = true;
    Promise.all([store.loadProgress(lang), store.listTexts(lang), store.listWords(lang)])
      .then(([p, t, w]) => { if (live) { setProgress(p); setTexts(t); setWords(w); } })
      .catch((e) => { if (live) { setDataErr(e?.message || "Couldn't load your data."); setTexts([]); setWords([]); } });
    return () => { live = false; };
  }, [lang, L]);

  /* any element with data-say speaks when tapped */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-say]");
      if (el) speech.sayNow((el.dataset.say || "").split("|"), el);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  /* build the quiz when the practice step opens */
  useEffect(() => {
    if (!lesson || quiz) return;
    const st = stepsFor(lesson)[step];
    if (st && st.k === "practice") {
      const q = buildQuiz(lesson, L.bigLo); setQuiz(q);
      if (q.qs[0]?.say) setTimeout(() => speech.sayNow([q.qs[0].say!]), 350);
    }
  }, [lesson, step, quiz, L]);

  const top = () => window.scrollTo(0, 0);
  const goTab = useCallback((id: string) => { speech.stop(); setLessonId(null); setReading(null); setQuiz(null); setTab(id); top(); }, []);
  const openLesson = (l: Lesson) => { speech.stop(); setReading(null); setTab(l.tabId); setLessonId(l.id); setStep(0); setQuiz(null); top(); };
  const goStep = (i: number) => { speech.stop(); setStep(i); top(); };
  const changeLang = (code: string) => { speech.stop(); setLessonId(null); setReading(null); setQuiz(null); setLangState(code); top(); };

  /* ---------- views ---------- */
  const currentTab = tabs.find((t) => t.id === tab) || tabs[0];

  return (
    <div className={`lang-${L.code} ${pron ? "" : "no-pron"}`}>
      <header className="top">
        <div className="wrap top-in">
          <button type="button" className="brand" onClick={() => goTab(tab)} aria-label="Home">
            <span className="brand-ru">{L.brand}</span><span className="brand-en">{L.brandEn}</span>
          </button>
          <div className="controls">
            <select className="lang-pick" aria-label="Language" value={lang} onChange={(e) => changeLang(e.target.value)}>
              {LANGUAGES.map((x) => <option key={x.code} value={x.code}>{x.native} · {x.name}</option>)}
            </select>
            {speech.elevenAvailable && <button type="button" className="toggle" aria-pressed={voicePref} onClick={() => setVoicePref(!voicePref)}>ElevenLabs voice</button>}
            <button type="button" className="toggle" aria-pressed={slow} onClick={() => setSlow(!slow)}>Slow audio</button>
            <button type="button" className="toggle" aria-pressed={pron} onClick={() => setPron(!pron)}>Pronunciation</button>
          </div>
        </div>
        <nav className="wrap tabs" role="tablist" aria-label="Course sections">
          {tabs.map((t) => (
            <button key={t.id} type="button" className="tab" role="tab" aria-selected={t.id === tab} onClick={() => goTab(t.id)}>
              {t.name}<small><Ru t={t.ru} /></small>
            </button>
          ))}
        </nav>
      </header>
      <div className="wrap">
        {speech.elevenFailed && speech.preferEleven && <p className="notice">ElevenLabs isn't answering (its credits may have run out), so your device's voice is reading instead.</p>}
        {speech.missingVoice && (
          <div className="voice-note">
            <p><b>No {L.name} voice found on this device.</b> Add one, then reload:</p>
            <ul>
              <li>iPhone / iPad: Settings → Accessibility → Spoken Content → Voices → {L.name}</li>
              <li>Mac: System Settings → Accessibility → Spoken Content → System voice → Manage Voices → {L.name}</li>
              <li>Windows: Settings → Time &amp; language → Speech → Add voices → {L.name}</li>
            </ul>
          </div>
        )}
        {dataErr && <p className="notice">Your saved data couldn't load: {dataErr}</p>}
      </div>
      <main className="wrap">
        {lesson ? renderLesson(lesson)
          : tab === "reader" ? (reading ? renderReading() : <ReaderHome L={L} lang={lang} tabInfo={currentTab} libraryTexts={course.texts} texts={texts} rlevel={rlevel} setRlevel={setRlevel} onAdded={(t) => { setTexts([t, ...(texts || [])]); openReading(t); }} onOpen={openReading} />)
          : tab === "review" ? <Review L={L} tabInfo={currentTab} all={all} progress={progress} words={words} />
          : renderOverview()}
      </main>
      <footer className="wrap" style={{ paddingBottom: 40 }}>
        <p className="muted" style={{ fontSize: ".8rem" }}>Signed in as {email} · <button type="button" className="link" onClick={() => supabase().auth.signOut()}>Sign out</button></p>
      </footer>
    </div>
  );

  /* ---------- section overview ---------- */
  function renderOverview() {
    const t = currentTab; const ls = t.lessons || [];
    const done = ls.filter((l) => progress[l.id]).length;
    return (
      <>
        <section className="tab-head">
          <p className="eyebrow">{L.name} · Section</p>
          <h1>{t.name}<span className="h1ru"><Ru t={t.ru} /></span></h1>
          <p className="lede">{t.desc}</p>
          <div className="progress"><div className="bar"><span style={{ width: `${ls.length ? Math.round((done / ls.length) * 100) : 0}%` }} /></div><span>{done} of {ls.length} lessons complete</span></div>
        </section>
        <ol className="lessons">
          {ls.map((l) => (
            <li key={l.id}>
              <button type="button" className="lesson-row" onClick={() => openLesson(l)}>
                <span className="num">{l.n}</span>
                <span className="lr-main"><span className="lr-title">{l.title}</span><span className="lr-ru"><Ru t={l.ru} /></span><span className="lr-goal">{l.goal}</span></span>
                {progress[l.id] ? <span className="chip done">Done · {progress[l.id].best}/{progress[l.id].total}</span> : <span className="chip">Not started</span>}
              </button>
            </li>
          ))}
        </ol>
      </>
    );
  }

  /* ---------- lesson ---------- */
  function renderLesson(l: Lesson) {
    const steps = stepsFor(l); const cur = steps[Math.min(step, steps.length - 1)];
    const prev = steps[step - 1], next = steps[step + 1];
    const idx = all.indexOf(l); const nxt = all[idx + 1];
    const d = progress[l.id];
    let body: React.ReactNode = null;
    if (cur.k === "goal") body = (
      <>
        <p className="eyebrow">{l.tabName} · Lesson {l.n} of {l.tabCount}</p>
        <h1>{l.title}<span className="h1ru"><Ru t={l.ru} /></span></h1>
        <p className="goal">{l.goal}</p>
        <div className="plan"><h3>How this lesson works</h3><ol>{steps.slice(1).map((s) => <li key={s.k}><b>{s.n}</b>: {STEP_DESC[s.k]}</li>)}</ol></div>
        <div><button type="button" className="btn" onClick={() => goStep(1)}>Start lesson</button></div>
      </>
    );
    if (cur.k === "learn") body = (
      <>
        <h2>Learn</h2>
        <div className="learn">{l.learn.map((p, i) => <p key={i}><Rich t={p} /></p>)}</div>
        {l.table && (
          <div className="tbl"><table><thead><tr>{l.table.h.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>{l.table.r.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Rich t={c} /></td>)}</tr>)}</tbody></table></div>
        )}
        {l.tip && <p className="tip"><b>Tip</b><Rich t={l.tip} /></p>}
      </>
    );
    if (cur.k === "listen") body = renderListen(l);
    if (cur.k === "examples") body = (
      <>
        <h2>Examples</h2>
        <div className="toolbar"><PlayAllBtn sel="#ex-list" gap={900} label="Play all" /><PlayAllBtn sel="#ex-list" gap={3200} label="Listen and repeat" ghost /><span className="hint">Listen and repeat leaves a pause after each sentence for you to say it.</span></div>
        <div className="rows" id="ex-list">{l.examples.map((e, i) => (
          <button key={i} type="button" className="row" data-say={e.ru}><span className="pi"><PlayIcon /></span><span className="row-ru"><Ru t={e.ru} /></span><span className="row-en">{e.en}</span></button>
        ))}</div>
      </>
    );
    if (cur.k === "practice") body = <><h2>Practice</h2>{renderQuiz(l)}</>;
    if (cur.k === "recap") body = (
      <>
        <h2>Recap</h2>
        <ul className="recap">{l.recap.map((r, i) => <li key={i}><Rich t={r} /></li>)}</ul>
        <p className="tip"><b>Your result</b>{d ? `Best practice score: ${d.best} of ${d.total}.` : "You haven't done the practice yet."}</p>
        <div className="toolbar">
          {!d && <button type="button" className="btn ghost" onClick={() => goStep(steps.findIndex((s) => s.k === "practice"))}>Do the practice</button>}
          {nxt ? <button type="button" className="btn" onClick={() => openLesson(nxt)}>Next: {nxt.title}</button> : <button type="button" className="btn" onClick={() => goTab("review")}>Go to Review</button>}
        </div>
      </>
    );
    return (
      <>
        <button type="button" className="crumb" onClick={() => goTab(l.tabId)}>← {l.tabName}</button>
        <nav className="steps" aria-label="Lesson stages">
          {steps.map((s, i) => <button key={s.k} type="button" className={`stepb ${i === step ? "cur" : i < step ? "past" : ""}`} aria-current={i === step ? "step" : undefined} onClick={() => goStep(i)}>{s.n}</button>)}
        </nav>
        <section className="panel">{body}</section>
        <div className="lnav">
          {prev ? <button type="button" className="btn ghost" onClick={() => goStep(step - 1)}>← {prev.n}</button> : <span />}
          {next && <button type="button" className="btn ghost" onClick={() => goStep(step + 1)}>{next.n} →</button>}
        </div>
      </>
    );
  }

  function renderListen(l: Lesson) {
    const tools = (hint: string) => (
      <div className="toolbar"><PlayAllBtn sel="#listen-list" gap={700} label="Play all" /><PlayAllBtn sel="#listen-list" gap={2800} label="Listen and repeat" ghost /><span className="hint">{hint}</span></div>
    );
    if (l.kind === "letters") return (
      <>
        <h2>Listen</h2>
        {tools("Tap a card to hear the letter, then a word that uses it.")}
        <div className="letters" id="listen-list">{l.items.map((it: any, i: number) => {
          const say = it.say === "" ? it.ex : `${it.say !== undefined ? it.say : it.lo}|${it.ex}`;
          return (
            <button key={i} type="button" className="letter" data-say={say}>
              <span className="glyph">{it.up}<span>{it.lo}</span></span>
              <span className="l-tr">{it.tr}</span><span className="l-sound">{it.sound}</span>
              <span className="l-ex"><span className="ru"><Ru t={it.ex} /></span> · {it.exEn}</span>
            </button>
          );
        })}</div>
        <h3>Now read these</h3>
        <div className="toolbar"><PlayAllBtn sel="#read-list" gap={2400} label="Read, then check" ghost /><span className="hint">Try reading each word aloud before you hear it.</span></div>
        <div className="rows" id="read-list">{l.words.map((w, i) => (
          <button key={i} type="button" className="row" data-say={w.ru}><span className="pi"><PlayIcon /></span><span className="row-ru"><Ru t={w.ru} /></span><span className="row-en">{w.en}</span></button>
        ))}</div>
      </>
    );
    if (l.kind === "words") return (
      <>
        <h2>Listen</h2>{tools("Listen and repeat leaves a pause after each word for you to say it.")}
        <div className="rows" id="listen-list">{l.items.map((it: any, i: number) => (
          <button key={i} type="button" className="row" data-say={it.ru}>
            <span className="pi"><PlayIcon /></span>
            <span><span className="row-ru"><Ru t={it.ru} /></span><span className="row-sub pron" style={{ display: "block" }}>say: {it.tr}</span></span>
            <span className="row-en">{it.en}{it.extra && <small className="ru" style={{ fontSize: ".95rem" }}><Ru t={it.extra} /></small>}</span>
          </button>
        ))}</div>
      </>
    );
    if (l.kind === "idioms") return (
      <>
        <h2>Listen</h2>{tools("Each saying shows its literal meaning, then what it really means.")}
        <div className="rows" id="listen-list">{l.items.map((it: any, i: number) => (
          <button key={i} type="button" className="row" data-say={it.ru}>
            <span className="pi"><PlayIcon /></span>
            <span><span className="row-ru"><Ru t={it.ru} /></span><span className="row-sub" style={{ display: "block" }}>Literally: {it.lit}</span></span>
            <span className="row-en"><b>{it.en}</b></span>
          </button>
        ))}</div>
      </>
    );
    return (
      <>
        <h2>Listen</h2>{tools("Say each one aloud after you hear it.")}
        <div className="rows" id="listen-list">{l.items.map((it: any, i: number) => (
          <button key={i} type="button" className="row" data-say={it.ru}><span className="pi"><PlayIcon /></span><span className="row-ru"><Ru t={it.ru} /></span><span className="row-en">{it.en}</span></button>
        ))}</div>
      </>
    );
  }

  /* ---------- quiz ---------- */
  function renderQuiz(l: Lesson) {
    const z = quiz && quiz.qs ? quiz : null;
    if (!z) return null;
    if (!z.qs.length) return <p>No practice questions for this lesson.</p>;
    const steps = stepsFor(l);
    if (z.finished) {
      const pct = z.score / z.qs.length;
      const msg = pct === 1 ? "Perfect. Move on to the recap." : pct >= 0.7 ? "Good work. Review anything you missed, then carry on." : "Worth another go. Revisit Listen first, then try again.";
      return (
        <div className="q-card" style={{ textAlign: "center", justifyItems: "center" }}>
          <p className="eyebrow">Practice complete</p>
          <p className="score">{z.score}<span className="muted" style={{ fontSize: ".5em" }}> / {z.qs.length}</span></p>
          <p>{msg}</p>
          <div className="toolbar" style={{ justifyContent: "center" }}>
            <button type="button" className="btn ghost" onClick={() => setQuiz(null)}>Try again</button>
            <button type="button" className="btn" onClick={() => goStep(steps.findIndex((s) => s.k === "recap"))}>Go to recap</button>
          </div>
        </div>
      );
    }
    const q = z.qs[z.i]; const answered = z.picked !== null;
    const correct = answered && q.options[z.picked!] === q.answer;
    const pick = (i: number) => {
      if (z.picked !== null) return;
      const ok = q.options[i] === q.answer;
      setQuiz({ ...z, picked: i, score: z.score + (ok ? 1 : 0) });
      if (q.ruOpts) speech.sayNow([q.answer]);
    };
    const nextQ = async () => {
      const ni = z.i + 1;
      if (ni >= z.qs.length) {
        setQuiz({ ...z, i: ni, picked: null, finished: true });
        const prev = progress[l.id];
        if (!prev || z.score >= prev.best) {
          setProgress({ ...progress, [l.id]: { best: z.score, total: z.qs.length } });
          store.saveProgress(lang, l.id, z.score, z.qs.length).catch((e) => setDataErr(e?.message || "Couldn't save your score."));
        }
      } else {
        setQuiz({ ...z, i: ni, picked: null });
        const nq = z.qs[ni]; if (nq.say) setTimeout(() => speech.sayNow([nq.say!]), 350);
      }
    };
    return (
      <div className="q-card">
        <div className="q-meta"><span>Question {z.i + 1} of {z.qs.length}</span><span>Score {z.score}</span></div>
        <p className="q-prompt">{q.ruOpts || q.say ? q.prompt : <Rich t={q.prompt} />}</p>
        {q.big && <p className="q-big ru">{q.big}</p>}
        {q.ru && <button type="button" className="q-ru" data-say={q.ru}><Ru t={q.ru} /></button>}
        {q.say && <button type="button" className="q-play" data-say={q.say} aria-label="Play the word again"><PlayIcon /></button>}
        <div className="opts">{q.options.map((o, i) => {
          let cls = "opt" + (q.ruOpts ? " ru" : "");
          if (answered) { if (o === q.answer) cls += " right"; else if (i === z.picked) cls += " wrong"; }
          return <button key={i} type="button" className={cls} disabled={answered} onClick={() => pick(i)}>{q.ruOpts ? <Ru t={o} /> : o}</button>;
        })}</div>
        {answered && (
          <>
            <div className={`feedback ${correct ? "good" : "bad"}`}>
              <b>{correct ? "Correct." : "Not quite."}</b>{" "}
              {!correct && <>The answer is {q.ruOpts ? <span className="ru"><Ru t={q.answer} /></span> : q.answer}. </>}
              {q.explain && <Rich t={q.explain} />}
            </div>
            <div><button type="button" className="btn" onClick={nextQ}>{z.i + 1 < z.qs.length ? "Next question" : "See your score"}</button></div>
          </>
        )}
      </div>
    );
  }

  function openReading(t: ReaderText) {
    speech.stop();
    const g: Gloss = {};
    (t.gloss || []).forEach((e) => { g[wkey(L, e[0])] = { lemma: e[1], en: e[2], note: e[3] }; });
    setLessonId(null); setTab("reader");
    setReading({ t, g, shown: new Set(), explain: {}, sel: null, confirmDel: false }); top();
  }

  /* ---------- reader: reading a text ---------- */
  function renderReading() {
    const R = reading!; const t = R.t;
    const set = (patch: Partial<Reading>) => setReading({ ...R, ...patch });
    const re = new RegExp(L.wordRe, "g");
    const selKey = R.sel ? `${R.sel.si}|${R.sel.w}` : "";

    const tokens = (s: string, si: number) => {
      const out: React.ReactNode[] = []; let last = 0, m: RegExpExecArray | null, k = 0; re.lastIndex = 0;
      while ((m = re.exec(s))) {
        if (m.index > last) out.push(<span key={k++}>{s.slice(last, m.index)}</span>);
        const w = m[0];
        out.push(<button key={k++} type="button" className={`w ${selKey === `${si}|${w}` ? "sel" : ""}`} onClick={() => { set({ sel: { si, w } }); speech.sayNow([w]); }}><Ru t={w} /></button>);
        last = re.lastIndex;
      }
      if (last < s.length) out.push(<span key={k++}>{s.slice(last)}</span>);
      return out;
    };

    async function explain(i: number) {
      const s = t.sentences[i];
      const ex = { ...R.explain, [i]: "Thinking…" }; set({ explain: ex });
      try {
        const r = await api<{ text: string }>("/api/claude", { task: "explain", lang, level: rlevel, sentence: s.ru, en: s.en, context: t.sentences.map((x) => x.ru).join(" ") });
        setReading((cur) => cur && cur.t.id === t.id ? { ...cur, explain: { ...cur.explain, [i]: r.text } } : cur);
      } catch (e: any) {
        setReading((cur) => cur && cur.t.id === t.id ? { ...cur, explain: { ...cur.explain, [i]: errCopy(e?.code || "") } } : cur);
      }
    }

    const sel = R.sel; const key = sel ? wkey(L, sel.w) : ""; const g = sel ? R.g[key] || R.g[key.replace(/ё/g, "е")] : null;
    const saved = !!words?.some((w) => w.key === key);
    async function toggleSave() {
      if (!sel) return;
      try {
        if (saved) { await store.removeWord(lang, key); setWords((words || []).filter((w) => w.key !== key)); }
        else {
          const w: store.SavedWord = { key, form: clean(sel.w), lemma: g?.lemma || sel.w, en: g?.en || "", note: g?.note || "", source_title: clean(t.title) };
          await store.addWord(lang, w); setWords([w, ...(words || [])]);
        }
      } catch (e: any) { setDataErr(e?.message || "Couldn't save that word."); }
    }

    return (
      <>
        <button type="button" className="crumb" onClick={() => { speech.stop(); setReading(null); }}>← Reader</button>
        <section className="tab-head" style={{ marginTop: 10 }}>
          <p className="eyebrow">{t.source}{t.level ? ` · ${t.level}` : ""}</p>
          <h1 className="ru" style={{ fontFamily: "var(--f-ru)", fontWeight: 700 }}><Ru t={t.title} /><span className="h1ru" style={{ fontFamily: "var(--f-ui)" }}>{t.titleEn}</span></h1>
        </section>
        <div className="toolbar" style={{ marginBottom: 8 }}>
          <div className="seg" role="group" aria-label="Translations">
            <button type="button" aria-pressed={rmode === "hide"} onClick={() => setRmode("hide")}>{L.name} only</button>
            <button type="button" aria-pressed={rmode === "tap"} onClick={() => setRmode("tap")}>Tap to translate</button>
            <button type="button" aria-pressed={rmode === "all"} onClick={() => setRmode("all")}>Show all</button>
          </div>
        </div>
        <div className="toolbar" style={{ marginBottom: 16 }}>
          <PlayAllBtn sel="#sents" gap={700} label="Read aloud" /><PlayAllBtn sel="#sents" gap={3500} label="Listen and repeat" ghost />
          <span className="hint">Tap any word for its meaning.</span>
        </div>
        <div className="sents" id="sents">{t.sentences.map((s, i) => {
          const show = rmode === "all" || (rmode === "tap" && R.shown.has(i)); const ex = R.explain[i];
          return (
            <article key={i} className="sent">
              <div className="sent-top"><button type="button" className="pi pbtn" data-say={s.ru} aria-label="Play this sentence"><PlayIcon /></button><p className="sent-ru">{tokens(s.ru, i)}</p></div>
              {show && <p className="sent-en">{s.en}</p>}
              <div className="sent-actions">
                {rmode === "tap" && <button type="button" className="link" onClick={() => { const n = new Set(R.shown); n.has(i) ? n.delete(i) : n.add(i); set({ shown: n }); }}>{show ? "Hide translation" : "Translate"}</button>}
                <button type="button" className="link" onClick={() => explain(i)}>{ex ? "Explain again" : "Explain the grammar"}</button>
              </div>
              {ex && <div className="explain" role="status">{ex}</div>}
            </article>
          );
        })}</div>
        {!t.builtin && (
          <div className="lnav">
            <span className="muted" style={{ fontSize: ".85rem" }}>Saved to your account, available on all your devices.</span>
            {R.confirmDel ? (
              <span className="toolbar">
                <button type="button" className="btn ghost" onClick={() => set({ confirmDel: false })}>Keep it</button>
                <button type="button" className="btn" onClick={async () => { try { await store.deleteText(t.id); setTexts((texts || []).filter((x) => x.id !== t.id)); setReading(null); } catch (e: any) { setDataErr(e?.message || "Couldn't delete that text."); } }}>Delete this text</button>
              </span>
            ) : <button type="button" className="btn ghost" onClick={() => set({ confirmDel: true })}>Delete text</button>}
          </div>
        )}
        {sel && (
          <div className="sheet">
            <div className="sheet-in">
              <div className="sheet-head">
                <button type="button" className="q-ru" style={{ margin: 0, padding: 0, textAlign: "left" }} data-say={sel.w}><Ru t={sel.w} /></button>
                <button type="button" className="link" onClick={() => set({ sel: null })}>Close</button>
              </div>
              {g ? (
                <>
                  <p><b>{g.en}</b></p>
                  {wkey(L, g.lemma) !== key && <p className="muted">Dictionary form: <button type="button" className="say-inline" data-say={g.lemma}><Ru t={g.lemma} /></button></p>}
                  {g.note && <p className="muted">{g.note}</p>}
                  <div className="toolbar">
                    <button type="button" className="btn ghost" data-say={sel.w}><PlayIcon /> Hear it</button>
                    <button type="button" className={`btn ${saved ? "on" : ""}`} onClick={toggleSave}>{saved ? "Saved to My words" : "Save to My words"}</button>
                  </div>
                </>
              ) : <p className="muted">No note for this word. Tap “Explain the grammar” under the sentence to ask about it.</p>}
            </div>
          </div>
        )}
      </>
    );
  }


}

/* ---------- reader: home ---------- */
function ReaderHome({ L, lang, tabInfo, libraryTexts, texts, rlevel, setRlevel, onAdded, onOpen }: {
  L: LangConfig; lang: string; tabInfo: Tab; libraryTexts: ReaderText[]; texts: ReaderText[] | null;
  rlevel: string; setRlevel: (v: string) => void; onAdded: (t: ReaderText) => void; onOpen: (t: ReaderText) => void;
}) {
    const t = tabInfo;
    const [mode, setMode] = useState<"paste" | "write">("paste");
    const [text, setText] = useState(""); const [title, setTitle] = useState(""); const [source, setSource] = useState("");
    const [topic, setTopic] = useState(""); const [len, setLen] = useState("12"); const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false);
    const ctl = useRef<AbortController | null>(null);

    async function go() {
      setStatus("");
      if (mode === "paste" && !text.trim() && !file) { setStatus(`Paste some ${L.name} text first, or add a photo or screenshot of it.`); return; }
      if (mode === "paste" && text.length > 3000) { setStatus(errCopy("too_long")); return; }
      if (mode === "write" && !topic.trim()) { setStatus("Type a topic first, for example ‘a weekend in the mountains’."); return; }
      setBusy(true); setStatus("Thinking… this usually takes 20–60 seconds.");
      ctl.current = new AbortController();
      try {
        const body: any = mode === "paste"
          ? { task: "prepare", lang, level: rlevel, text: text.trim(), title: title.trim(), image: file ? await imageToBase64(file) : undefined }
          : { task: "write", lang, level: rlevel, topic: topic.trim(), len: Number(len) };
        const r = await api<{ text: Omit<ReaderText, "id"> }>("/api/claude", body, ctl.current.signal);
        const saved = await store.insertText(lang, { ...r.text, source: mode === "paste" ? source.trim() || "Your text" : "Written by Claude for practice" });
        onAdded(saved);
      } catch (e: any) {
        setStatus(e?.name === "AbortError" ? "Stopped." : errCopy(e?.code || ""));
      } finally { setBusy(false); ctl.current = null; }
    }

    const Row = ({ x }: { x: ReaderText }) => (
      <li><button type="button" className="lesson-row" onClick={() => onOpen(x)}>
        <span className="num">{x.builtin ? "" : "✎"}</span>
        <span className="lr-main"><span className="lr-title ru"><Ru t={x.title} /></span><span className="lr-ru" style={{ fontFamily: "var(--f-ui)" }}>{x.titleEn}</span><span className="lr-goal">{x.source}</span></span>
        {x.level && <span className="chip">{x.level}</span>}
      </button></li>
    );

    return (
      <>
        <section className="tab-head"><p className="eyebrow">{L.name} · Section</p><h1>{t.name}<span className="h1ru"><Ru t={t.ru} /></span></h1><p className="lede">{t.desc}</p></section>
        <div className="panel">
          <section className="plan" aria-labelledby="add-h">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h3 id="add-h">Add a text</h3>
              <div className="seg" role="group" aria-label="How to add">
                <button type="button" aria-pressed={mode === "paste"} onClick={() => setMode("paste")}>Paste or photo</button>
                <button type="button" aria-pressed={mode === "write"} onClick={() => setMode("write")}>Write me one</button>
              </div>
            </div>
            {mode === "paste" ? (
              <>
                <p className="muted" style={{ fontSize: ".9rem" }}>Copy a poem, story or news article from any {L.name} website and paste it here, or add a photo or screenshot of it. Up to 3,000 characters at a time.</p>
                <div className="field"><label htmlFor="r-text">{L.name} text</label><textarea id="r-text" rows={6} placeholder={L.pastePh} dir={L.rtl ? "rtl" : undefined} value={text} onChange={(e) => setText(e.target.value)} /></div>
                <div className="field"><label htmlFor="r-image">Or a photo or screenshot</label><input id="r-image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} /></div>
                <div className="fields">
                  <div className="field"><label htmlFor="r-title">Title (optional)</label><input id="r-title" type="text" autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                  <div className="field"><label htmlFor="r-source">Where it's from (optional)</label><input id="r-source" type="text" autoComplete="off" placeholder={L.sourcePh} value={source} onChange={(e) => setSource(e.target.value)} /></div>
                </div>
              </>
            ) : (
              <>
                <p className="muted" style={{ fontSize: ".9rem" }}>Claude writes a new practice text at your level on any subject. Name a current story and get a simple version to read.</p>
                <div className="fields">
                  <div className="field"><label htmlFor="r-topic">Topic</label><input id="r-topic" type="text" autoComplete="off" placeholder="e.g. a weekend in the mountains" value={topic} onChange={(e) => setTopic(e.target.value)} /></div>
                  <div className="field"><label htmlFor="r-len">Length</label><select id="r-len" value={len} onChange={(e) => setLen(e.target.value)}><option value="6">Short (6 sentences)</option><option value="12">Medium (12 sentences)</option><option value="20">Long (20 sentences)</option></select></div>
                </div>
              </>
            )}
            <div className="fields"><div className="field"><label htmlFor="r-level">Explain it for</label>
              <select id="r-level" value={rlevel} onChange={(e) => setRlevel(e.target.value)}>{Object.entries(LEVELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div></div>
            <div className="toolbar">
              <button type="button" className="btn" disabled={busy} onClick={go}>{mode === "paste" ? "Prepare for reading" : "Write a text"}</button>
              {busy && <button type="button" className="btn ghost" onClick={() => ctl.current?.abort()}>Stop</button>}
              <span className="hint" role="status">{status}</span>
            </div>
          </section>
          <p className="tip"><b>Where to find texts</b><span dangerouslySetInnerHTML={{ __html: L.sources }} /> Copy the text, come back, and paste it above.</p>
          <h3>Your texts</h3>
          {texts === null ? <p className="muted">Loading your texts…</p>
            : texts.length ? <ol className="lessons">{texts.map((x) => <Row key={x.id} x={x} />)}</ol>
            : <p className="muted">Texts you add appear here, on all your devices.</p>}
          <h3>Library</h3>
          <ol className="lessons">{libraryTexts.map((x) => <Row key={x.id} x={x} />)}</ol>
        </div>
      </>
    );
  }

/* ---------- review ---------- */
function Review({ L, tabInfo, all, progress, words }: { L: LangConfig; tabInfo: Tab; all: Lesson[]; progress: store.Progress; words: store.SavedWord[] | null }) {
    const t = tabInfo;
    const [scope, setScope] = useState<string>(() => readPref("scope", "all"));
    const build = useCallback((): Card[] => {
      if (scope === "words") return shuffle((words || []).map((w) => ({
        ru: w.lemma || w.form, en: w.en,
        extra: [wkey(L, w.lemma || "") !== w.key ? "Seen as: " + w.form : "", w.note].filter(Boolean).join(". "),
        from: "My words · " + (w.source_title || ""),
      })));
      const src = scope === "done" ? all.filter((l) => progress[l.id]) : all;
      const cards: Card[] = [];
      src.forEach((l) => {
        if (l.kind === "letters") l.words.forEach((w) => cards.push({ ru: w.ru, en: w.en, from: l.title }));
        else if (l.kind === "words") l.items.forEach((w: any) => cards.push({ ru: w.ru, en: w.en, pron: w.tr, extra: w.extra, from: l.title }));
        else if (l.kind === "idioms") l.items.forEach((w: any) => cards.push({ ru: w.ru, en: w.en, extra: "Literally: " + w.lit, from: l.title }));
      });
      return shuffle(cards);
    }, [scope, words, all, progress, L]);
    const [deck, setDeck] = useState<Card[]>(build);
    const [i, setI] = useState(0); const [flip, setFlip] = useState(false);
    useEffect(() => { writePref("scope", scope); setDeck(build()); setI(0); setFlip(false); }, [scope, build]);
    const c = deck[i];
    const move = (d: number) => { const n = Math.max(0, Math.min(deck.length - 1, i + d)); setI(n); setFlip(false); if (deck[n]) speech.sayNow([deck[n].ru]); };
    return (
      <>
        <section className="tab-head"><p className="eyebrow">{L.name} · Section</p><h1>{t.name}<span className="h1ru"><Ru t={t.ru} /></span></h1>
          <p className="lede">Flashcards drawn from your lessons. Hear each word, say what it means, then flip to check.</p>
          <div className="seg" role="group" aria-label="Which cards">
            <button type="button" aria-pressed={scope === "all"} onClick={() => setScope("all")}>All lessons</button>
            <button type="button" aria-pressed={scope === "done"} onClick={() => setScope("done")}>Lessons I've finished</button>
            <button type="button" aria-pressed={scope === "words"} onClick={() => setScope("words")}>My words</button>
          </div>
        </section>
        {!c ? (
          <p className="tip"><b>No cards yet</b>{scope === "words" ? "Tap a word in the Reader and choose Save to My words. It will appear here." : "Finish the practice in any lesson and its words appear here. Or switch to All lessons."}</p>
        ) : (
          <div className="panel">
            <div className="fcard">
              <p className="from">{c.from} · {i + 1} of {deck.length}</p>
              <button type="button" className="q-ru ru" data-say={c.ru}><Ru t={c.ru} /></button>
              {flip ? (
                <div className="back"><b>{c.en}</b>{c.pron && <span className="muted pron">say: {c.pron}</span>}{c.extra && <span className="muted"><Ru t={c.extra} /></span>}</div>
              ) : <p className="muted">What does it mean?</p>}
            </div>
            <div className="toolbar" style={{ justifyContent: "center" }}>
              <button type="button" className="btn ghost" disabled={i === 0} onClick={() => move(-1)}>← Previous</button>
              <button type="button" className="btn" onClick={() => setFlip(!flip)}>{flip ? "Hide meaning" : "Show meaning"}</button>
              <button type="button" className="btn ghost" disabled={i >= deck.length - 1} onClick={() => move(1)}>Next →</button>
              <button type="button" className="btn ghost" onClick={() => { setDeck(build()); setI(0); setFlip(false); }}>Shuffle</button>
            </div>
          </div>
        )}
      </>
    );
  }

/* ---------- play-all button: reads a list aloud; tap again to stop ---------- */
function PlayAllBtn({ sel, gap, label, ghost }: { sel: string; gap: number; label: string; ghost?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [, r] = useReducer((x: number) => x + 1, 0);
  useEffect(() => speech.subscribe(r), []);
  const on = !!ref.current && speech.activeBtn === ref.current;
  return (
    <button ref={ref} type="button" className={`btn ${ghost ? "ghost" : ""} ${on ? "on" : ""}`} onClick={(e) => { e.stopPropagation(); speech.playAll(e.currentTarget, sel, gap); }}>
      {on ? "Stop" : <>{!ghost && <PlayIcon />} {label}</>}
    </button>
  );
}
