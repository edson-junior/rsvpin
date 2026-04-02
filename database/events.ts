'server-only';
import { cache } from 'react';
import type { EventDetails, EventWithGuestCount } from '@/lib/types';
import type { Session } from '@/migrations/00009-createTableSessions';
import { sql } from './connect';

// "Read" in CRUD
export const getAllEventsInsecure = cache(async () => {
  return await sql<EventWithGuestCount[]>`
    SELECT
      events.*,
      count(event_guests.user_id)::int AS guest_count
    FROM
      events
      LEFT JOIN event_guests ON events.id = event_guests.event_id
    GROUP BY
      events.id
    ORDER BY
      events.starts_at ASC
  `;
});

export const isEventHost = cache(
  async (sessionToken: Session['token'], eventId: string) => {
    const [row] = await sql<{ isHost: boolean }[]>`
      SELECT
        EXISTS (
          SELECT
            1
          FROM
            event_hosts
            INNER JOIN sessions ON event_hosts.user_id = sessions.user_id
          WHERE
            event_hosts.event_id = ${eventId}::uuid
            AND sessions.token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        ) AS is_host
    `;

    return Boolean(row?.isHost);
  },
);

export const getEventByIdInsecure = cache(async (id: string) => {
  const [event] = await sql<EventDetails[]>`
    SELECT
      events.*,
      events.starts_at::date AS date,
      (
        SELECT
          coalesce(
            json_agg(
              json_build_object(
                'userId',
                event_hosts.user_id,
                'name',
                users.name,
                'username',
                users.username
              )
            ),
            '[]'::json
          )
        FROM
          event_hosts
          INNER JOIN users ON event_hosts.user_id = users.id
        WHERE
          event_hosts.event_id = events.id
      ) AS hosts,
      (
        SELECT
          coalesce(
            json_agg(
              json_build_object(
                'userId',
                event_guests.user_id,
                'name',
                users.name,
                'username',
                users.username,
                'status',
                event_guests.status
              )
            ),
            '[]'::json
          )
        FROM
          event_guests
          INNER JOIN users ON event_guests.user_id = users.id
        WHERE
          event_guests.event_id = events.id
      ) AS guests
    FROM
      events
    WHERE
      events.id = ${id}::uuid
  `;

  return event;
});
