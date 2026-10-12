import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

/*
 * Single-user admin login. The password lives in the ADMIN_PASSWORD environment variable
 * (set it in .env.local and in Netlify → Site configuration → Environment variables).
 * A successful login sets a signed, HTTP-only session cookie; changing the password
 * signs everyone out.
 */

export const SESSION_COOKIE = 'delix4_admin';
const SESSION_SECONDS = 60 * 60 * 8;
const MIN_PASSWORD_LENGTH = 10;

const password = () => process.env.ADMIN_PASSWORD ?? '';

export const isAdminConfigured = () => password().length >= MIN_PASSWORD_LENGTH;

const signingKey = () =>
  createHash('sha256')
    .update(`delix4-admin-session\u0000${password()}\u0000${process.env.ADMIN_SESSION_SECRET ?? ''}`)
    .digest();

const sign = (payload: string) => createHmac('sha256', signingKey()).update(payload).digest('base64url');

function safeEqual(a: string, b: string) {
  // Hash first so the comparison is constant-time regardless of input length.
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export const checkPassword = (input: string) => isAdminConfigured() && safeEqual(input, password());

function isValidToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) * 1000 < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}

export async function createSession() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  (await cookies()).set(SESSION_COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin() {
  return isValidToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}

// Best-effort brute-force protection: 8 failed attempts per IP per 15 minutes.
const failedLogins = new Map<string, { count: number; resetAt: number }>();
const MAX_FAILURES = 8;
const WINDOW_MS = 15 * 60 * 1000;

export async function clientIp() {
  const h = await headers();
  return (
    h.get('x-nf-client-connection-ip') ??
    h.get('x-forwarded-for')?.split(',')[0].trim() ??
    h.get('x-real-ip') ??
    'unknown'
  );
}

export function isLoginBlocked(ip: string) {
  const entry = failedLogins.get(ip);
  if (!entry || Date.now() > entry.resetAt) return false;
  return entry.count >= MAX_FAILURES;
}

export function recordFailedLogin(ip: string) {
  const now = Date.now();
  const entry = failedLogins.get(ip);
  if (!entry || now > entry.resetAt) failedLogins.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else entry.count += 1;
}

export const clearFailedLogins = (ip: string) => failedLogins.delete(ip);
