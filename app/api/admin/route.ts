import { adminClient, hasReaderAccess, isAdminEmail, json, requireAdmin } from "@/lib/server";

export const runtime = "nodejs";

const LANGS = ["ru", "de", "ar"];

/** List everyone who can sign in, with their access and progress. */
export async function GET(req: Request) {
  const me = await requireAdmin(req);
  if (!me) return json({ error: "not_admin" }, 403);
  try {
    const sb = adminClient();
    const { data, error } = await sb.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) throw { status: 500, code: "list_failed", message: error.message };
    const { data: prog } = await sb.from("progress").select("user_id,lang");
    const done: Record<string, Record<string, number>> = {};
    (prog || []).forEach((r: any) => { (done[r.user_id] ||= {})[r.lang] = ((done[r.user_id] ||= {})[r.lang] || 0) + 1; });
    const users = data.users
      .map((u) => ({
        id: u.id, email: u.email || "", created_at: u.created_at, last_sign_in_at: u.last_sign_in_at || null,
        admin: isAdminEmail(u.email), reader: hasReaderAccess(u), readerFlag: u.app_metadata?.reader === true,
        lessons: LANGS.map((l) => ({ lang: l, done: done[u.id]?.[l] || 0 })),
      }))
      .sort((a, b) => Number(b.admin) - Number(a.admin) || a.email.localeCompare(b.email));
    return json({ users, me: me.id });
  } catch (e: any) {
    return json({ error: e?.code || "error", message: e?.message || "" }, e?.status || 500);
  }
}

/** Admin actions: create, reset_password, set_reader, delete. */
export async function POST(req: Request) {
  const me = await requireAdmin(req);
  if (!me) return json({ error: "not_admin" }, 403);
  const b = await req.json().catch(() => ({}));
  try {
    const sb = adminClient();
    const pw = String(b.password || "");
    if ((b.action === "create" || b.action === "reset_password") && pw.length < 8) return json({ error: "short_password" }, 400);
    if (b.action === "create") {
      const email = String(b.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "bad_email" }, 400);
      const { error } = await sb.auth.admin.createUser({ email, password: pw, email_confirm: true, app_metadata: { reader: !!b.reader } });
      if (error) return json({ error: /already/i.test(error.message) ? "exists" : "create_failed", message: error.message }, 400);
      return json({ ok: true });
    }
    const id = String(b.id || "");
    if (!id) return json({ error: "bad_request" }, 400);
    if (b.action === "reset_password") {
      const { error } = await sb.auth.admin.updateUserById(id, { password: pw });
      if (error) return json({ error: "update_failed", message: error.message }, 400);
      return json({ ok: true });
    }
    if (b.action === "set_reader") {
      const { data: got } = await sb.auth.admin.getUserById(id);
      const { error } = await sb.auth.admin.updateUserById(id, { app_metadata: { ...(got.user?.app_metadata || {}), reader: !!b.reader } });
      if (error) return json({ error: "update_failed", message: error.message }, 400);
      return json({ ok: true });
    }
    if (b.action === "delete") {
      if (id === me.id) return json({ error: "self" }, 400);
      const { error } = await sb.auth.admin.deleteUser(id);
      if (error) return json({ error: "delete_failed", message: error.message }, 400);
      return json({ ok: true });
    }
    return json({ error: "bad_request" }, 400);
  } catch (e: any) {
    return json({ error: e?.code || "error", message: e?.message || "" }, e?.status || 500);
  }
}
