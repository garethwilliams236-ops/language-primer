"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;
export const supabaseConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function supabase(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return client;
}

export async function accessToken(): Promise<string | null> {
  const { data } = await supabase().auth.getSession();
  return data.session?.access_token ?? null;
}

export async function api<T = any>(path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const token = await accessToken();
  const r = await fetch(path, {
    method: body === undefined ? "GET" : "POST",
    headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw { status: r.status, code: j.error || "error", message: j.message || "" };
  return j as T;
}
