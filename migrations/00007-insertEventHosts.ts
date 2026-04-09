import type { Sql } from 'postgres';

const eventHosts = [
  {
    event_id: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    user_id: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    created_at: '2026-03-10T09:15:00Z',
  },
  {
    event_id: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    user_id: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    created_at: '2026-03-12T14:00:00Z',
  },
];

export async function up(sql: Sql) {
  for (const host of eventHosts) {
    await sql`
      INSERT INTO
        event_hosts (event_id, user_id, created_at)
      VALUES
        (
          ${host.event_id}::uuid,
          ${host.user_id}::uuid,
          ${host.created_at}::timestamptz
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const host of eventHosts) {
    await sql`
      DELETE FROM event_hosts
      WHERE
        event_id = ${host.event_id}::uuid
        AND user_id = ${host.user_id}::uuid
    `;
  }
}
