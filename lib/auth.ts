'server-only';

import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { createSession, deleteSession } from '@/database/sessions';

const SESSION_COOKIE_NAME = 'sessionToken';

export async function createSessionCookie(userId: string) {
  const token = crypto.randomBytes(100).toString('base64');
  const session = await createSession(token, userId);

  (await cookies()).set(SESSION_COOKIE_NAME, session.token, {
    // Cookie accessible only by server, not browser JavaScript
    httpOnly: true,
    // Instruct browser to delete cookie after 24 hours, matching session expiry
    maxAge: 60 * 60 * 24,
    // Instruct browser to send cookie with requests to all paths
    path: '/',
    // Security: prevent browser from sending cookie when another website loads your page as image or frame
    sameSite: 'lax',
    // Prevent browser from sending cookie over HTTP in production
    secure: process.env.NODE_ENV === 'production',
  });

  return session;
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await deleteSession(token);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}
