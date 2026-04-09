import type { Sql } from 'postgres';
import type { User } from '@/lib/types';

export type Session = {
  id: string;
  token: string;
  expiryTimestamp: Date;
  userId: User['id'];
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sessions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      token varchar(150) NOT NULL UNIQUE,
      expiry_timestamp timestamptz NOT NULL DEFAULT now() + interval '24 hours',
      -- ON DELETE CASCADE: delete all sessions when user is deleted
      user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE sessions`;
}
