'server-only';
import { cache } from 'react';
import type { EventDetails, Event } from '@/lib/types';
import { sql } from './connect';

// "Read" in CRUD
export const getAllEventsInsecure = cache(async () => {
  return await sql<Event[]>`
    SELECT
      events.*
    FROM
      events
      LEFT JOIN event_guests ON events.id = event_guests.event_id
    GROUP BY
      events.id
    ORDER BY
      events.starts_at ASC
  `;
});

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
