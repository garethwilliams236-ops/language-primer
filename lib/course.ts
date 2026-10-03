import ru from "./languages/ru";
import de from "./languages/de";
import ar from "./languages/ar";
import type { Course, Lesson, Tab } from "./types";

const RAW: Record<string, any> = { ru, de, ar };
export const LANGUAGES = [ru, de, ar].map((x: any) => ({ code: x.L.code as string, native: x.L.native as string, name: x.L.name as string }));

const cache: Record<string, Course> = {};
export function getCourse(code: string): Course {
  if (cache[code]) return cache[code];
  const raw = RAW[code] || RAW.ru;
  const tabs: Tab[] = raw.TABS.map((t: any) => ({ ...t }));
  tabs.forEach((t: any) => {
    if (!t.lessons) return;
    t.lessons = t.lessons.map((l0: any, i: number) => {
      const l: any = { ...l0, n: i + 1, tabId: t.id, tabName: t.name, tabCount: t.lessons.length };
      if (l.kind === "letters") {
        l.items = l.items.map((a: any[]) => ({ up: a[0], lo: a[1], tr: a[2], sound: a[3], ex: a[4], exEn: a[5], say: a[6] }));
        l.words = (l.words || []).map((a: any[]) => ({ ru: a[0], en: a[1] }));
      } else if (l.kind === "words") {
        l.items = l.items.map((a: any[]) => ({ ru: a[0], tr: a[1], en: a[2], extra: a[3] }));
      } else if (l.kind === "idioms") {
        l.items = l.items.map((a: any[]) => ({ ru: a[0], lit: a[1], en: a[2] }));
      } else {
        l.items = (l.items || []).map((a: any[]) => ({ ru: a[0], en: a[1] }));
      }
      l.words = l.words || [];
      l.examples = (l.examples || []).map((a: any[]) => ({ ru: a[0], en: a[1] }));
      return l as Lesson;
    });
  });
  const all = tabs.flatMap((t) => t.lessons || []);
  return (cache[code] = { L: raw.L, tabs, all, texts: raw.READER_TEXTS });
}

export const clean = (s: string) => String(s ?? "").replace(/\+/g, "");
export function wkey(L: { norm: (w: string) => string }, w: string) {
  return L.norm(clean(String(w)).replace(/́/g, "").toLowerCase());
}
export function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
