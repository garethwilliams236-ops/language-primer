/* Checks every language: lessons have their fields, quizzes are well formed,
   and every word in the built-in reader texts has a glossary entry. Run: npm run check:content */
import { LANGUAGES, getCourse, wkey } from "../lib/course";

let problems = 0;
for (const { code } of LANGUAGES) {
  const { L, tabs, all, texts } = getCourse(code);
  const ids = new Set<string>();
  for (const l of all) {
    if (ids.has(l.id)) { console.log(`${code}: duplicate lesson id ${l.id}`); problems++; }
    ids.add(l.id);
    if (!l.goal || !l.learn?.length || !l.recap?.length) { console.log(`${code} ${l.id}: missing goal, learn or recap`); problems++; }
    for (const q of l.quiz || []) if (q.a < 0 || q.a >= q.o.length || new Set(q.o).size !== q.o.length) { console.log(`${code} ${l.id}: bad quiz "${q.p}"`); problems++; }
    if (!l.quiz && l.kind === "grammar") { console.log(`${code} ${l.id}: grammar lesson without a quiz`); problems++; }
  }
  const re = new RegExp(L.wordRe, "g");
  for (const t of texts) {
    const g = new Set(t.gloss.map((e) => wkey(L, e[0])));
    for (const s of t.sentences) for (const m of s.ru.matchAll(re)) if (!g.has(wkey(L, m[0]))) { console.log(`${code} ${t.id}: no gloss for "${m[0]}"`); problems++; }
  }
  console.log(`${L.name}: ${tabs.length} tabs, ${all.length} lessons, ${texts.length} library texts`);
}
if (problems) { console.log(`${problems} problem(s)`); process.exit(1); } else console.log("Content OK");
