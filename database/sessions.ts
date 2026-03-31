'server-only';
import { cache } from 'react';
import { sql } from './connect';
import type { Session } from '@/migrations/00009-createTableSessions';

export const getValidSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    SELECT
      sessions.*
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
  `;

  return session;
});

export async function createSession(
  sessionToken: Session['token'],
  userId: string,
) {
  const [session] = await sql<Session[]>`
    INSERT INTO
      sessions (token, user_id)
    VALUES
      (
        ${sessionToken},
        ${userId}::uuid
      )
    RETURNING
      sessions.*
  `;

  // Clean up table: Delete sessions that are expired
  await sql`
    DELETE FROM sessions
    WHERE
      sessions.expiry_timestamp < now()
  `;

  return session!;
}

export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE
      token = ${sessionToken}
    RETURNING
      sessions.*
  `;

  return session;
});
