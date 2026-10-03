import { shuffle } from "./course";
import type { Lesson, QuizQ, QuizState } from "./types";

function opts(ans: string, pool: string[]) {
  const others = shuffle([...new Set(pool)].filter((x) => x !== ans)).slice(0, 3);
  return shuffle([ans, ...others]);
}

export function buildQuiz(l: Lesson, bigLo: boolean): QuizState {
  let qs: QuizQ[] = [];
  if (l.quiz) {
    qs = l.quiz.map((q) => ({ prompt: q.p, ru: q.ru, options: shuffle(q.o.slice()), answer: q.o[q.a], ruOpts: !!q.ruo, explain: q.x }));
  } else if (l.kind === "letters") {
    const lab = (it: any) => `${it.tr} — ${it.sound}`;
    const pool = l.items.map(lab);
    shuffle(l.items.slice()).slice(0, 5).forEach((it: any) =>
      qs.push({ prompt: "What sound does this letter make?", big: bigLo ? it.up + it.lo : it.up, options: opts(lab(it), pool), answer: lab(it), explain: `Example: [[${it.ex}]] (${it.exEn})` })
    );
    const wr = l.words.map((w) => w.ru), we = l.words.map((w) => w.en);
    shuffle(l.words.slice()).slice(0, 3).forEach((w, i) => {
      if (i % 2 === 0) qs.push({ prompt: "Listen. Which word did you hear?", say: w.ru, options: opts(w.ru, wr), answer: w.ru, ruOpts: true, explain: `[[${w.ru}]] means ‘${w.en}’.` });
      else qs.push({ prompt: "Read this word. What does it mean?", ru: w.ru, options: opts(w.en, we), answer: w.en });
    });
  } else if (l.kind === "words") {
    const ru = l.items.map((x: any) => x.ru), en = l.items.map((x: any) => x.en);
    shuffle(l.items.slice()).slice(0, 8).forEach((it: any, i: number) => {
      const t = i % 3;
      if (t === 0) qs.push({ prompt: "What does this mean?", ru: it.ru, options: opts(it.en, en), answer: it.en });
      else if (t === 1) qs.push({ prompt: "Listen. Which did you hear?", say: it.ru, options: opts(it.ru, ru), answer: it.ru, ruOpts: true, explain: `[[${it.ru}]] means ‘${it.en}’.` });
      else qs.push({ prompt: `How do you say ‘${it.en}’?`, options: opts(it.ru, ru), answer: it.ru, ruOpts: true });
    });
  } else if (l.kind === "idioms") {
    const en = l.items.map((x: any) => x.en);
    shuffle(l.items.slice()).slice(0, 6).forEach((it: any) =>
      qs.push({ prompt: "What does this saying mean?", ru: it.ru, options: opts(it.en, en), answer: it.en, explain: `Literally: ${it.lit}.` })
    );
  }
  return { qs, i: 0, score: 0, picked: null, finished: false };
}
