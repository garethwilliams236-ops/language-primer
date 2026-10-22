import { hasReaderAccess, isAdminEmail, json } from "@/lib/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

/** What the signed-in user may do: { admin, reader }. */
export async function GET(req: Request) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ admin: false, reader: false });
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data } = await sb.auth.getUser(token);
  if (!data.user) return json({ admin: false, reader: false });
  return json({ admin: isAdminEmail(data.user.email), reader: hasReaderAccess(data.user) });
}
