# Language Primer

One app for learning Russian, German and Modern Standard Arabic, on iPhone, iPad and desktop.

Each language has the same sections: Alphabet (or Sounds), Vocabulary, Grammar, Structure, Idioms, Reader and Review. Lessons run Goal → Learn → Listen → Examples → Practice → Recap. The Reader prepares any pasted text, photo or Claude-written text for tap-to-translate reading.

## Stack
Next.js 15 (App Router, TypeScript) on Vercel · Supabase (auth, Postgres with RLS, Storage) · Claude API for the Reader · ElevenLabs (optional) for audio, falling back to the device's own voice.

## Where things live
- `lib/languages/{ru,de,ar}.ts` — all course content. Add a language by copying one, then registering it in `lib/course.ts`.
- `components/Primer.tsx` — the app (sections, lessons, quiz, reader, review).
- `lib/speech.ts` — audio: ElevenLabs clips via `/api/tts`, device voice fallback.
- `app/api/claude/route.ts` — prepare / write / explain texts with Claude.
- `app/api/tts/route.ts` — ElevenLabs clips, cached in the public `audio` bucket.
- `supabase/migrations/0001_init.sql` — tables `progress`, `texts`, `words` (RLS: own rows only) and the `audio` bucket.

## Setup
1. Supabase: run `supabase/migrations/0001_init.sql` in the SQL editor. Create your user under Authentication → Users → Add user (auto-confirm).
2. Vercel: import the GitHub repo and add the variables from `.env.example`.
3. Local: copy `.env.example` to `.env.local`, fill it in, then `npm install` and `npm run dev` (port 3080).

## Checks
- `npm run typecheck`
- `npm run check:content` — lesson fields, quizzes, and a gloss for every word in the library texts
- `npx tsx --tsconfig scripts/tsconfig.smoke.json scripts/ui-smoke.tsx` — clicks through every screen in a simulated browser
