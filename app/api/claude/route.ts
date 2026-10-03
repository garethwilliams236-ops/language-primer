import { getCourse } from "@/lib/course";
import { LEVELS } from "@/lib/levels";
import { claude, clean, json, normaliseText, parseJson, prepRules, requireUser } from "@/lib/server";

export const runtime = "nodejs";
export const maxDuration = 300;

/** Claude features for the Reader: prepare a pasted text, write a new one, or explain a sentence. */
export async function POST(req: Request) {
  const user = await requireUser(req);
  if (!user) return json({ error: "not_signed_in" }, 401);
  let b: any;
  try { b = await req.json(); } catch { return json({ error: "bad_request" }, 400); }
  const { L } = getCourse(String(b.lang || "ru"));
  const level = LEVELS[b.level] ? b.level : "A1";
  try {
    if (b.task === "prepare" || b.task === "write") {
      let prompt = prepRules(L, level);
      const content: any[] = [];
      if (b.task === "prepare") {
        const text = String(b.text || "").trim();
        if (!text && !b.image) return json({ error: "empty" }, 400);
        if (text.length > 3000) return json({ error: "too_long" }, 400);
        if (b.title) prompt += `\nThe reader gave this title: ${String(b.title).slice(0, 200)}`;
        if (b.image?.data) {
          content.push({ type: "image", source: { type: "base64", media_type: String(b.image.media_type || "image/jpeg"), data: String(b.image.data) } });
          prompt += `\nThe ${L.name} text is in the attached image. Transcribe it exactly (main text only, skip menus and captions), then process it.`;
        }
        if (text) prompt += `\n\nText:\n"""\n${text}\n"""`;
      } else {
        const topic = String(b.topic || "").trim().slice(0, 300);
        if (!topic) return json({ error: "empty" }, 400);
        const len = [6, 12, 20].includes(Number(b.len)) ? Number(b.len) : 12;
        prompt = `Write an original text in natural, modern ${L.writeName} for a learner at level ${LEVELS[level]}. Topic: ${topic}. Length: about ${len} sentences. Use vocabulary and grammar suited to that level. Then process it as follows.\n\n` + prompt;
      }
      content.push({ type: "text", text: prompt });
      const { text, truncated } = await claude(content, { maxTokens: 16000 });
      const t = truncated ? null : normaliseText(L, parseJson(text));
      if (!t) return json({ error: "invalid_json" }, 422);
      return json({ text: t });
    }
    if (b.task === "explain") {
      const s = clean(String(b.sentence || "")).slice(0, 600);
      if (!s) return json({ error: "empty" }, 400);
      const prompt = `You are a friendly ${L.name} tutor for an English speaker (level ${LEVELS[level]}).
Explain this sentence from a ${L.name} text: «${s}»
(English: ${String(b.en || "").slice(0, 600)})
Cover, briefly: the word-by-word structure, the case or tense of any word that changes form and why, and any idiom. ${L.explainMarks} Plain text, no Markdown, under 130 words.
Context (the surrounding text): ${clean(String(b.context || "")).slice(0, 1500)}`;
      const { text } = await claude([{ type: "text", text: prompt }], { fast: true, maxTokens: 800 });
      return json({ text });
    }
    return json({ error: "bad_request" }, 400);
  } catch (e: any) {
    return json({ error: e?.code || "upstream_error" }, e?.status || 502);
  }
}
