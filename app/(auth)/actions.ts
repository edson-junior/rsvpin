'use server';

import { redirect } from 'next/navigation';
import { deleteSessionCookie } from '@/lib/auth';

export async function signOut() {
  await deleteSessionCookie();
  redirect('/signin');
}
