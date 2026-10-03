import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { json, requireUser } from "@/lib/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const enabled = () => !!(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_VOICE_ID && process.env.SUPABASE_SERVICE_ROLE_KEY);

/** Whether ElevenLabs audio is set up. */
export async function GET() {
  return json({ enabled: enabled() });
}

/** Returns a URL for an ElevenLabs recording of `text`, generating and caching it in Supabase Storage the first time. */
export async function POST(req: Request) {
  if (!enabled()) return json({ error: "not_configured" }, 503);
  const user = await requireUser(req);
  if (!user) return json({ error: "not_signed_in" }, 401);
  const b = await req.json().catch(() => ({}));
  const text = String(b.text || "").replace(/\+/g, "").trim();
  const lang = String(b.lang || "xx").replace(/[^a-z]/g, "").slice(0, 5) || "xx";
  if (!text || text.length > 500) return json({ error: "bad_request" }, 400);

  const voice = process.env.ELEVENLABS_VOICE_ID!;
  const model = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";
  const hash = createHash("sha256").update(`${voice}|${model}|${text}`).digest("hex").slice(0, 32);
  const path = `${lang}/${hash}.mp3`;
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const url = admin.storage.from("audio").getPublicUrl(path).data.publicUrl;

  const head = await fetch(url, { method: "HEAD" }).catch(() => null);
  if (head && head.ok) return json({ url, cached: true });

  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: model, voice_settings: { stability: 0.6, similarity_boost: 0.8, speed: 0.92 } }),
  });
  if (!r.ok) {
    console.error("ElevenLabs error", r.status, (await r.text()).slice(0, 300));
    return json({ error: r.status === 401 || r.status === 402 || r.status === 429 ? "quota" : "upstream_error" }, 503);
  }
  const audio = Buffer.from(await r.arrayBuffer());
  const up = await admin.storage.from("audio").upload(path, audio, { contentType: "audio/mpeg", upsert: true, cacheControl: "31536000" });
  if (up.error) { console.error("Storage upload", up.error.message); return json({ error: "storage" }, 500); }
  return json({ url, cached: false });
}
