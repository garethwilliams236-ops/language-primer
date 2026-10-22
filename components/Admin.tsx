"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/supabase";

type Row = {
  id: string; email: string; created_at: string; last_sign_in_at: string | null;
  admin: boolean; reader: boolean; readerFlag: boolean; lessons: { lang: string; done: number }[];
};

const LANG = { ru: "Russian", de: "German", ar: "Arabic" } as Record<string, string>;
const when = (s: string | null) => (s ? new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Never");
const ERR: Record<string, string> = {
  short_password: "Passwords need at least 8 characters.",
  bad_email: "That doesn't look like an email address.",
  exists: "Someone with that email can already sign in.",
  self: "You can't remove your own account.",
  not_admin: "Your account isn't an admin.",
  no_service_key: "SUPABASE_SERVICE_ROLE_KEY is missing in Vercel, so accounts can't be managed.",
};
const errText = (e: any) => ERR[e?.code] || e?.message || "Something went wrong. Try again.";

/** Admin page: who can sign in, their progress, and account actions. */
export default function Admin({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [me, setMe] = useState("");
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [reader, setReader] = useState(true);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<{ id: string; kind: "reset" | "delete" } | null>(null);
  const [newPw, setNewPw] = useState("");

  const load = useCallback(async () => {
    try { const r = await api<{ users: Row[]; me: string }>("/api/admin"); setRows(r.users); setMe(r.me); }
    catch (e) { setMsg(errText(e)); setRows([]); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function act(body: any, done: string) {
    setBusy(true); setMsg("");
    try { await api("/api/admin", body); setMsg(done); setOpen(null); setNewPw(""); await load(); }
    catch (e) { setMsg(errText(e)); }
    finally { setBusy(false); }
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    await act({ action: "create", email, password: pw, reader }, `Added ${email.trim()}. Send them the app link, their email and this password.`);
    setEmail(""); setPw("");
  }

  return (
    <>
      <button type="button" className="crumb" onClick={onClose}>← Back to lessons</button>
      <section className="tab-head" style={{ marginTop: 10 }}>
        <p className="eyebrow">Admin</p>
        <h1>People</h1>
        <p className="lede">Everyone who can sign in to Language Primer. Each person only ever sees their own progress, texts and words.</p>
      </section>
      <div className="panel">
        <p className="hint" role="status" style={{ minHeight: "1.2em" }}>{msg}</p>

        <form className="plan" onSubmit={add} aria-labelledby="add-person">
          <h3 id="add-person">Add a person</h3>
          <div className="fields">
            <div className="field"><label htmlFor="ad-email">Email</label><input id="ad-email" type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div className="field"><label htmlFor="ad-pw">Password (8+ characters)</label><input id="ad-pw" type="text" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} required minLength={8} /></div>
          </div>
          <label className="check"><input id="ad-reader" type="checkbox" checked={reader} onChange={(e) => setReader(e.target.checked)} /> Can use the Reader's Claude features and ElevenLabs voice (uses your API credit)</label>
          <div><button type="submit" className="btn" disabled={busy}>Add person</button></div>
        </form>

        {rows === null ? <p className="muted">Loading…</p> : (
          <ul className="people">
            {rows.map((u) => (
              <li key={u.id} className="person">
                <div className="person-top">
                  <div className="lr-main">
                    <span className="lr-title">{u.email}</span>
                    <span className="lr-goal">Last signed in: {when(u.last_sign_in_at)} · Added {when(u.created_at)}</span>
                    <span className="lr-goal">Lessons done: {u.lessons.map((l) => `${LANG[l.lang]} ${l.done}`).join(" · ")}</span>
                  </div>
                  <div className="chips">
                    {u.admin && <span className="chip done">Admin</span>}
                    <span className={`chip ${u.reader ? "done" : ""}`}>{u.reader ? "Reader access" : "Lessons only"}</span>
                  </div>
                </div>
                <div className="sent-actions" style={{ paddingLeft: 0 }}>
                  <button type="button" className="link" onClick={() => { setOpen({ id: u.id, kind: "reset" }); setNewPw(""); }}>Reset password</button>
                  {!u.admin && (
                    <button type="button" className="link" disabled={busy} onClick={() => act({ action: "set_reader", id: u.id, reader: !u.readerFlag }, u.readerFlag ? `${u.email} now has lessons only.` : `${u.email} can now use the Reader.`)}>
                      {u.readerFlag ? "Remove Reader access" : "Give Reader access"}
                    </button>
                  )}
                  {u.id !== me && <button type="button" className="link danger" onClick={() => setOpen({ id: u.id, kind: "delete" })}>Remove</button>}
                </div>
                {open?.id === u.id && open.kind === "reset" && (
                  <div className="inline-form">
                    <div className="field"><label htmlFor={`np-${u.id}`}>New password (8+ characters)</label><input id={`np-${u.id}`} type="text" autoComplete="new-password" value={newPw} onChange={(e) => setNewPw(e.target.value)} /></div>
                    <div className="toolbar">
                      <button type="button" className="btn" disabled={busy} onClick={() => act({ action: "reset_password", id: u.id, password: newPw }, `Password changed for ${u.email}.`)}>Save password</button>
                      <button type="button" className="btn ghost" onClick={() => setOpen(null)}>Cancel</button>
                    </div>
                  </div>
                )}
                {open?.id === u.id && open.kind === "delete" && (
                  <div className="inline-form">
                    <p>Remove {u.email}? They won't be able to sign in, and their progress, texts and saved words are deleted.</p>
                    <div className="toolbar">
                      <button type="button" className="btn" disabled={busy} onClick={() => act({ action: "delete", id: u.id }, `Removed ${u.email}.`)}>Remove {u.email}</button>
                      <button type="button" className="btn ghost" onClick={() => setOpen(null)}>Keep them</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
