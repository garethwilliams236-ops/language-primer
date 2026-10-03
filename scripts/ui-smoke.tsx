/* Simulated-DOM walk through the main screens for each language. Not part of the app build. */
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body><div id=root></div></body></html>", { url: "http://localhost/", pretendToBeVisual: true });
const g: any = globalThis;
g.window = dom.window; g.document = dom.window.document; Object.defineProperty(g, "navigator", { value: dom.window.navigator, configurable: true });
g.HTMLElement = dom.window.HTMLElement; g.Element = dom.window.Element; g.Node = dom.window.Node; g.MouseEvent = dom.window.MouseEvent;
g.localStorage = dom.window.localStorage; g.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.HTMLElement.prototype.scrollIntoView = () => {}; dom.window.scrollTo = () => {};
g.fetch = async (u: string) => ({ ok: true, json: async () => ({ enabled: false }) });
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"; process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "x";

(async () => {
  const React = await import("react");
  const { createRoot } = await import("react-dom/client");
  const { act } = await import("react");
  const store = await import("../lib/store");
  // stub the database
  Object.assign(store, {});
  const Primer = (await import("../components/Primer")).default;
  const root = createRoot(document.getElementById("root")!);
  const $ = (s: string) => document.querySelector<HTMLElement>(s);
  const $$ = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
  const click = async (el: HTMLElement | null, what: string) => { if (!el) throw new Error("missing: " + what); await act(async () => { el.click(); }); };
  const byText = (sel: string, t: string) => $$(sel).find((e) => (e.textContent || "").includes(t)) || null;
  await act(async () => { root.render(React.createElement(Primer, { email: "me@example.com" })); });
  for (const code of ["ru", "de", "ar"]) {
    const pick = $(".lang-pick") as unknown as HTMLSelectElement;
    await act(async () => { pick.value = code; pick.dispatchEvent(new dom.window.Event("change", { bubbles: true })); });
    await act(async () => { await new Promise((r) => setTimeout(r, 30)); });
    const tabs = $$(".tab"); if (tabs.length !== 7) throw new Error(code + " tabs " + tabs.length);
    // every section, every lesson, every step
    for (let ti = 0; ti < 5; ti++) {
      await click($$(".tab")[ti], "tab");
      const n = $$(".lesson-row").length;
      for (let li = 0; li < n; li++) {
        await click($$(".lesson-row")[li], "lesson");
        const steps = $$(".stepb").length;
        for (let si = 0; si < steps; si++) {
          await click($$(".stepb")[si], "step");
          if ($(".q-card")) { // answer every question
            for (let guard = 0; guard < 12 && $(".opt"); guard++) {
              await click($$(".opt")[0], "option");
              const nb = byText(".q-card .btn", "Next question") || byText(".q-card .btn", "See your score");
              if (!nb) break; await click(nb, "next");
              if ($(".score")) break;
            }
          }
        }
        await click($(".crumb"), "crumb");
      }
    }
    // reader: open each library text, tap a word, translate, open sheet
    await click(byText(".tab", "Reader"), "reader tab");
    const libN = $$(".lesson-row").length;
    for (let k = 0; k < libN; k++) {
      await click($$(".lesson-row")[k], "text");
      await click($(".w"), "word");
      if (!$(".sheet")) throw new Error(code + " no word sheet");
      if ($(".sheet")!.textContent!.includes("No note")) throw new Error(code + " missing gloss for " + $(".w.sel")?.textContent);
      await click(byText(".link", "Translate"), "translate");
      await click($(".crumb"), "back");
    }
    await click(byText(".seg button", "Write me one"), "write mode");
    await click(byText(".tab", "Review"), "review tab");
    await click(byText(".btn", "Show meaning"), "flip");
    await click(byText(".btn", "Next"), "next card");
    console.log(code, "ok:", libN, "texts,", document.querySelector(".fcard .from")?.textContent);
  }
  root.unmount(); process.exit(0);
})().catch((e) => { console.error("FAIL", e); process.exit(1); });
