'server-only';

import { cache } from 'react';
import type { Session } from '@/migrations/00009-createTableSessions';
import { sql } from './connect';
import type { User } from '@/lib/types';

type UserAuth = Pick<User, 'id'>;
type UserWithPasswordHash = UserAuth & {
  passwordHash: string;
};

export const getUserByEmailInsecure = cache(async (email: string) => {
  const [user] = await sql<UserAuth[]>`
    SELECT
      users.id
    FROM
      users
    WHERE
      users.email = ${email}
  `;

  return user;
});

export const getUserWithPasswordHashInsecure = cache(async (email: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      users.id,
      users.password_hash
    FROM
      users
    WHERE
      users.email = ${email}
  `;

  return user;
});

export const getUserByUsernameInsecure = cache(async (username: string) => {
  const [user] = await sql<UserAuth[]>`
    SELECT
      users.id
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
  `;

  return user;
});

export const createUserInsecure = async (
  name: User['name'],
  email: string,
  username: User['username'],
  passwordHash: UserWithPasswordHash['passwordHash'],
) => {
  const [user] = await sql<UserAuth[]>`
    INSERT INTO
      users (
        name,
        email,
        username,
        password_hash
      )
    VALUES
      (
        ${name},
        ${email},
        ${username.toLowerCase()},
        ${passwordHash}
      )
    RETURNING
      users.id
  `;

  return user;
};

export const getUserBySessionToken = cache(
  async (sessionToken: Session['token']) => {
    const [user] = await sql<
      Pick<User, 'id' | 'name' | 'username' | 'bio' | 'location' | 'website'>[]
    >`
      SELECT
        users.id,
        users.name,
        users.username,
        users.bio,
        users.location,
        users.website
      FROM
        users
        INNER JOIN sessions ON users.id = sessions.user_id
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
    `;

    return user;
  },
);
