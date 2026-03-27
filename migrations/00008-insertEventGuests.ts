import type { Sql } from 'postgres';

const eventGuests = [
  {
    event_id: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    user_id: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
    status: 'going',
    created_at: '2026-03-10T09:15:00Z',
  },
  {
    event_id: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    user_id: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
    status: 'going',
    created_at: '2026-03-12T14:00:00Z',
  },
];

export async function up(sql: Sql) {
  for (const guest of eventGuests) {
    await sql`
      INSERT INTO
        event_guests (
          event_id,
          user_id,
          status,
          created_at
        )
      VALUES
        (
          ${guest.event_id}::uuid,
          ${guest.user_id}::uuid,
          ${guest.status},
          ${guest.created_at}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const guest of eventGuests) {
    await sql`
      DELETE FROM event_guests
      WHERE
        event_id = ${guest.event_id}::uuid
        AND user_id = ${guest.user_id}::uuid
    `;
  }
}
