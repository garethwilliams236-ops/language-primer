"use client";
import { supabase } from "./supabase";
import type { ReaderText } from "./types";

export type Progress = Record<string, { best: number; total: number }>;
export type SavedWord = { id?: string; key: string; form: string; lemma: string; en: string; note: string; source_title: string };

export async function loadProgress(lang: string): Promise<Progress> {
  const { data, error } = await supabase().from("progress").select("lesson_id,best,total").eq("lang", lang);
  if (error) throw error;
  const p: Progress = {};
  (data || []).forEach((r: any) => { p[r.lesson_id] = { best: r.best, total: r.total }; });
  return p;
}
export async function saveProgress(lang: string, lessonId: string, best: number, total: number) {
  const { error } = await supabase().from("progress").upsert({ lang, lesson_id: lessonId, best, total, updated_at: new Date().toISOString() }, { onConflict: "user_id,lang,lesson_id" });
  if (error) throw error;
}

const toText = (r: any): ReaderText => ({ id: r.id, title: r.title, titleEn: r.title_en || "", level: r.level || "", source: r.source || "", sentences: r.sentences || [], gloss: r.gloss || [], created: Date.parse(r.created_at) });
export async function listTexts(lang: string): Promise<ReaderText[]> {
  const { data, error } = await supabase().from("texts").select("*").eq("lang", lang).order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(toText);
}
export async function insertText(lang: string, t: Omit<ReaderText, "id">): Promise<ReaderText> {
  const { data, error } = await supabase().from("texts").insert({ lang, title: t.title, title_en: t.titleEn, level: t.level, source: t.source, sentences: t.sentences, gloss: t.gloss }).select("*").single();
  if (error) throw error;
  return toText(data);
}
export async function deleteText(id: string) {
  const { error } = await supabase().from("texts").delete().eq("id", id);
  if (error) throw error;
}

export async function listWords(lang: string): Promise<SavedWord[]> {
  const { data, error } = await supabase().from("words").select("*").eq("lang", lang).order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as SavedWord[];
}
export async function addWord(lang: string, w: SavedWord) {
  const { error } = await supabase().from("words").upsert({ lang, ...w }, { onConflict: "user_id,lang,key" });
  if (error) throw error;
}
export async function removeWord(lang: string, key: string) {
  const { error } = await supabase().from("words").delete().eq("lang", lang).eq("key", key);
  if (error) throw error;
}
