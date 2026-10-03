import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { LangConfig, ReaderText } from "./types";
import { LEVELS } from "./levels";
import { clean, wkey } from "./course";

/** Returns the signed-in user for this request, or null if missing, invalid, or not on the allow list. */
export async function requireUser(req: Request) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data, error } = await sb.auth.getUser(token);
  if (error || !data.user) return null;
  const allow = (process.env.ALLOWED_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (allow.length && !allow.includes((data.user.email || "").toLowerCase())) return null;
  return data.user;
}

export const json = (body: unknown, status = 200) => Response.json(body, { status });

type Block = { type: "text"; text: string } | { type: "image"; source: { type: "base64"; media_type: string; data: string } };
export async function claude(content: Block[], opts: { fast?: boolean; maxTokens: number }) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw { status: 503, code: "not_configured" };
  const model = opts.fast ? process.env.ANTHROPIC_MODEL_FAST || "claude-haiku-4-5-20251001" : process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model, max_tokens: opts.maxTokens, messages: [{ role: "user", content }] }),
  });
  if (!r.ok) {
    const detail = await r.text();
    console.error("Anthropic error", r.status, detail.slice(0, 500));
    throw { status: r.status === 429 ? 429 : 502, code: r.status === 429 ? "rate_limited" : "upstream_error" };
  }
  const j = await r.json();
  const text = (j.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
  return { text, truncated: j.stop_reason === "max_tokens" };
}

export function parseJson(text: string) {
  try { return JSON.parse(text); } catch {}
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) { try { return JSON.parse(fence[1]); } catch {} }
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a >= 0 && b > a) { try { return JSON.parse(text.slice(a, b + 1)); } catch {} }
  return null;
}

export const prepRules = (L: LangConfig, lvl: string) => `You are preparing a ${L.name} text for an English-speaking learner of ${L.name} whose level is ${LEVELS[lvl] || lvl}.
Reply with ONLY one JSON object of this shape:
{"title": "short ${L.name} title", "titleEn": "English title", "level": "A1|A2|B1|B2|C1 (the text's difficulty)", "sentences": [{"ru": "...", "en": "..."}], "glossary": [["word form", "dictionary form", "English meaning here", "short note"]]}
Rules:
- Split the text into sentences, in order. For poetry or song, use one item per line. Keep the original ${L.name} wording exactly; do not shorten, correct or modernise it.
${L.prepMarks}
- "en": a natural English translation of that sentence or line.
- "glossary": one entry for every distinct word form in the text. The word form is ${L.formRule}, exactly as it appears. The meaning fits this context. The note (at most 12 words) gives the case, tense, person, aspect or idiom that explains the form; use "" when nothing useful.
- If the text has no title, invent a short one.`;

export function normaliseText(L: LangConfig, d: any): Omit<ReaderText, "id"> | null {
  if (!d || !Array.isArray(d.sentences)) return null;
  const fix = (s: any) => String(s || "").replace(/́/g, "+").trim();
  const sentences = d.sentences.map((s: any) => ({ ru: fix(s && s.ru), en: String((s && s.en) || "") })).filter((s: any) => s.ru);
  if (!sentences.length) return null;
  const g = d.glossary || [];
  const rows: any[] = Array.isArray(g) ? g : Object.entries(g).map(([k, v]: any) => [k].concat(Array.isArray(v) ? v : [v?.lemma, v?.meaning, v?.note]));
  const gloss = rows.filter((e) => Array.isArray(e) && e[0]).map((e) => [wkey(L, e[0]), fix(e[1] || e[0]), String(e[2] || ""), String(e[3] || "")] as [string, string, string, string]);
  return { title: fix(d.title || L.untitled), titleEn: String(d.titleEn || ""), level: LEVELS[d.level] ? d.level : "", source: "", sentences, gloss };
}

export { clean };
