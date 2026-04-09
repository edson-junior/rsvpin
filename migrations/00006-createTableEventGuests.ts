import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE event_guests (
      event_id uuid NOT NULL REFERENCES events (id) ON DELETE CASCADE,
      user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      status guest_status NOT NULL DEFAULT 'going',
      created_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (event_id, user_id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE event_guests`;
}
