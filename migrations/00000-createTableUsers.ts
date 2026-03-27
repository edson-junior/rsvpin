import type { Sql } from 'postgres';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().max(120),
  email: z.email().max(80),
  password: z.string().max(120),
  username: z.string().max(100),
  avatar_url: z.string().nullable(),
  bio: z.string().nullable(),
  location: z.string().max(120).nullable(),
  website: z.string().max(120).nullable(),
});

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  created_at: Date;
  updated_at: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name varchar(120) NOT NULL,
      email varchar(80) NOT NULL UNIQUE,
      password_hash varchar(120) NOT NULL,
      username varchar(100) NOT NULL UNIQUE,
      avatar_url text,
      bio text,
      location varchar(120),
      website varchar(120),
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
