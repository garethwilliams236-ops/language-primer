"use client";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import Primer from "./Primer";

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!supabaseConfigured) { setSession(null); return; }
    supabase().auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase().auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigured) {
    return (
      <div className="auth">
        <h1>Language Primer</h1>
        <p className="tip"><b>Setup needed</b>Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to the environment, then redeploy.</p>
      </div>
    );
  }
  if (session === undefined) return null;
  if (!session) return <SignIn />;
  return <Primer email={session.user.email || ""} />;
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = await supabase().auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setErr(error.message === "Invalid login credentials" ? "That email and password don't match. Check them and try again." : error.message);
  }

  return (
    <form className="auth" onSubmit={submit}>
      <div>
        <p className="eyebrow">Russian · German · Arabic</p>
        <h1>Language Primer</h1>
      </div>
      <div className="plan">
        <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="field"><label htmlFor="password">Password</label><input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        {err && <p className="err" role="alert">{err}</p>}
        <div><button type="submit" className="btn" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></div>
      </div>
      <p className="muted" style={{ fontSize: ".85rem" }}>You stay signed in on this device. Your progress, texts and saved words sync across your devices.</p>
    </form>
  );
}
