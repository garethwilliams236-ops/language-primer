"use client";
import { clean } from "./course";
import { accessToken } from "./supabase";

const SILENT = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * One speech engine for the whole app. Plays ElevenLabs clips (through /api/tts, cached in Supabase)
 * when that voice is chosen and available, and falls back to the device's own voice otherwise.
 */
class Speech {
  code = "ru"; tts = "ru-RU"; voiceRe: RegExp = /^ru/i;
  slow = false; preferEleven = true; elevenAvailable = false; elevenFailed = false;
  voice: SpeechSynthesisVoice | null = null; voicesSeen = false;
  runId = 0; activeBtn: HTMLElement | null = null;
  audio: HTMLAudioElement | null = null; primed = false;
  urls = new Map<string, string>();
  listeners = new Set<() => void>();

  get synth() { return typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null; }
  get usingEleven() { return this.preferEleven && this.elevenAvailable && !this.elevenFailed; }
  get missingVoice() { return !this.usingEleven && (!this.synth || (this.voicesSeen && !this.voice)); }

  emit() { this.listeners.forEach((f) => f()); }
  subscribe(f: () => void) { this.listeners.add(f); return () => { this.listeners.delete(f); }; }

  init() {
    const s = this.synth; if (!s) return;
    const pick = () => this.pickVoice();
    pick(); s.addEventListener?.("voiceschanged", pick); setTimeout(pick, 800);
  }
  setLang(code: string, tts: string, re: RegExp) { this.stop(); this.code = code; this.tts = tts; this.voiceRe = re; this.voice = null; this.pickVoice(); }
  pickVoice() {
    const v = this.synth?.getVoices() || []; if (!v.length) return;
    this.voicesSeen = true;
    const m = v.filter((x) => this.voiceRe.test(x.lang));
    this.voice = m.find((x) => /premium|enhanced|google/i.test(x.name)) || m[0] || null;
    this.emit();
  }

  /** iOS only lets audio play after a tap: play a silent clip during the tap so later clips may follow. */
  prime() {
    if (!this.usingEleven || this.primed) return;
    const a = this.audio || (this.audio = new Audio());
    a.src = SILENT; a.play().then(() => { this.primed = true; }).catch(() => {});
  }

  private device(t: string) {
    return new Promise<void>((res) => {
      const s = this.synth; if (!s) return res();
      const u = new SpeechSynthesisUtterance(t); u.lang = this.tts; if (this.voice) u.voice = this.voice;
      u.rate = this.slow ? 0.6 : 0.92;
      let done = false; const fin = () => { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin; setTimeout(fin, 2500 + t.length * (this.slow ? 280 : 180));
      s.speak(u);
    });
  }
  private async eleven(t: string) {
    const k = this.code + "|" + t;
    let url = this.urls.get(k);
    if (!url) {
      const token = await accessToken();
      const r = await fetch("/api/tts", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ lang: this.code, text: t }) });
      if (!r.ok) throw new Error("tts " + r.status);
      url = (await r.json()).url as string; this.urls.set(k, url);
    }
    const a = this.audio || (this.audio = new Audio());
    a.src = url; a.defaultPlaybackRate = a.playbackRate = this.slow ? 0.75 : 1;
    await a.play();
    await new Promise<void>((res) => {
      const done = () => { a.removeEventListener("ended", done); a.removeEventListener("pause", done); res(); };
      a.addEventListener("ended", done); a.addEventListener("pause", done);
    });
  }
  async utter(text: string) {
    const t = clean(text).trim(); if (!t) return;
    if (this.usingEleven) {
      try { await this.eleven(t); return; } catch { this.elevenFailed = true; this.emit(); }
    }
    await this.device(t);
  }
  stop() {
    this.runId++; this.activeBtn = null;
    this.synth?.cancel(); if (this.audio && !this.audio.paused) this.audio.pause();
    if (typeof document !== "undefined") document.querySelectorAll(".playing").forEach((e) => e.classList.remove("playing"));
    this.emit();
  }
  async sayNow(texts: string[], el?: Element | null) {
    this.prime(); this.stop(); const id = this.runId; el?.classList.add("playing");
    for (const t of texts) { if (id !== this.runId) break; await this.utter(t); if (texts.length > 1) await sleep(250); }
    if (el && id === this.runId) el.classList.remove("playing");
  }
  /** Read every [data-say] element inside `selector` in order, highlighting each. Tapping again stops. */
  async playAll(btn: HTMLElement, selector: string, gap: number) {
    if (this.activeBtn === btn) { this.stop(); return; }
    this.prime(); this.stop(); const id = this.runId; this.activeBtn = btn; this.emit();
    const box = document.querySelector(selector);
    const els = box ? Array.from(box.querySelectorAll<HTMLElement>("[data-say]")) : [];
    for (const el of els) {
      if (id !== this.runId) break;
      const hl = el.closest(".sent") || el; el.classList.add("playing"); hl.classList.add("playing"); hl.scrollIntoView({ block: "nearest" });
      for (const t of (el.dataset.say || "").split("|")) { if (id !== this.runId) break; await this.utter(t); await sleep(200); }
      el.classList.remove("playing"); hl.classList.remove("playing");
      if (id !== this.runId) break;
      await sleep(gap);
    }
    if (this.activeBtn === btn) { this.activeBtn = null; this.emit(); }
  }
}

export const speech = new Speech();
