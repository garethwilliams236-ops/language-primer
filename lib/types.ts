export type LangConfig = {
  code: string; name: string; native: string; brand: string; brandEn: string; writeName: string;
  tts: string; voiceRe: RegExp; bigLo: boolean; rtl: boolean;
  norm: (w: string) => string; wordRe: string;
  untitled: string; pastePh: string; sourcePh: string; sources: string;
  prepMarks: string; formRule: string; explainMarks: string;
};
export type LetterItem = { up: string; lo: string; tr: string; sound: string; ex: string; exEn: string; say?: string };
export type WordItem = { ru: string; tr?: string; en: string; extra?: string };
export type IdiomItem = { ru: string; lit: string; en: string };
export type PlainItem = { ru: string; en: string };
export type QuizSpec = { p: string; ru?: string; o: string[]; a: number; ruo?: boolean; x?: string };
export type Lesson = {
  id: string; title: string; ru: string; kind: "letters" | "words" | "idioms" | "grammar";
  goal: string; learn: string[]; tip?: string; table?: { h: string[]; r: string[][] };
  items: any[]; words: PlainItem[]; examples: PlainItem[]; quiz?: QuizSpec[]; recap: string[];
  n: number; tabId: string; tabName: string; tabCount: number;
};
export type Tab = { id: string; name: string; ru: string; desc: string; lessons?: Lesson[] };
export type ReaderText = {
  id: string; builtin?: boolean; title: string; titleEn: string; level: string; source: string;
  sentences: { ru: string; en: string }[]; gloss: [string, string, string, string][]; created?: number;
};
export type Course = { L: LangConfig; tabs: Tab[]; all: Lesson[]; texts: ReaderText[] };
export type QuizQ = { prompt: string; ru?: string; big?: string; say?: string; options: string[]; answer: string; ruOpts?: boolean; explain?: string };
export type QuizState = { qs: QuizQ[]; i: number; score: number; picked: number | null; finished: boolean };
