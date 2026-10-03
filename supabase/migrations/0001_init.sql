-- Language Primer: lesson progress, reader texts, saved words, and an audio cache.
-- Run once in the Supabase SQL editor (or with `supabase db push`).

create table if not exists public.progress (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  lang text not null,
  lesson_id text not null,
  best int not null,
  total int not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang, lesson_id)
);

create table if not exists public.texts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  lang text not null,
  title text not null,
  title_en text,
  level text,
  source text,
  sentences jsonb not null,
  gloss jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists texts_user_lang_idx on public.texts (user_id, lang, created_at desc);

create table if not exists public.words (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  lang text not null,
  key text not null,
  form text,
  lemma text,
  en text,
  note text,
  source_title text,
  created_at timestamptz not null default now(),
  unique (user_id, lang, key)
);

alter table public.progress enable row level security;
alter table public.texts enable row level security;
alter table public.words enable row level security;

create policy "own progress" on public.progress for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own texts" on public.texts for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own words" on public.words for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Public bucket for generated pronunciation clips (course phrases only; written by the server).
insert into storage.buckets (id, name, public) values ('audio', 'audio', true) on conflict (id) do nothing;
