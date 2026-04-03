'server-only';
import { cache } from 'react';
import type { Event, EventDetails, EventWithGuestCount } from '@/lib/types';
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

export const getEventsHostedByUsernameInsecure = cache(
  async (username: string) => {
    return await sql<EventWithGuestCount[]>`
      SELECT
        events.*,
        count(event_guests.user_id)::int AS guest_count
      FROM
        events
        INNER JOIN event_hosts ON events.id = event_hosts.event_id
        INNER JOIN users ON event_hosts.user_id = users.id
        LEFT JOIN event_guests ON events.id = event_guests.event_id
      WHERE
        users.username = ${username.toLowerCase()}
      GROUP BY
        events.id
      ORDER BY
        events.starts_at ASC
    `;
  },
);

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

export const createEvent = async (
  sessionToken: Session['token'],
  name: Event['name'],
  description: Event['description'],
  image: Event['image'],
  location: Event['location'],
  category: Event['category'],
  startsAt: Event['startsAt'],
  endsAt: Event['endsAt'],
  maxGuests: Event['maxGuests'],
) => {
  const [event] = await sql<Pick<Event, 'id'>[]>`
    WITH
      new_event AS (
        INSERT INTO
          events (
            name,
            description,
            image,
            location,
            category,
            location_type,
            starts_at,
            ends_at,
            max_guests,
            created_by
          )
        SELECT
          ${name},
          ${description},
          ${image},
          ${location},
          ${category},
          'offline',
          ${startsAt},
          ${endsAt},
          ${maxGuests},
          sessions.user_id
        FROM
          sessions
        WHERE
          sessions.token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
        RETURNING
          events.id,
          events.created_by
      )
    INSERT INTO
      event_hosts (event_id, user_id)
    SELECT
      new_event.id,
      new_event.created_by
    FROM
      new_event
    RETURNING
      event_hosts.event_id AS id
  `;

  return event;
};

export const updateEvent = async (
  sessionToken: Session['token'],
  eventId: string,
  name: Event['name'],
  description: Event['description'],
  image: Event['image'],
  location: Event['location'],
  category: Event['category'],
  startsAt: Event['startsAt'],
  endsAt: Event['endsAt'],
  maxGuests: Event['maxGuests'],
) => {
  const [event] = await sql<Pick<Event, 'id'>[]>`
    UPDATE events
    SET
      name = ${name},
      description = ${description},
      image = ${image},
      location = ${location},
      category = ${category},
      starts_at = ${startsAt},
      ends_at = ${endsAt},
      max_guests = ${maxGuests},
      updated_at = now()
    FROM
      sessions
      INNER JOIN event_hosts ON sessions.user_id = event_hosts.user_id
    WHERE
      events.id = ${eventId}::uuid
      AND event_hosts.event_id = events.id
      AND sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
    RETURNING
      events.id
  `;

  return event;
};

export const deleteEvent = async (
  sessionToken: Session['token'],
  eventId: string,
) => {
  const [event] = await sql<Pick<Event, 'id'>[]>`
    DELETE FROM events USING sessions
    INNER JOIN event_hosts ON sessions.user_id = event_hosts.user_id
    WHERE
      events.id = ${eventId}::uuid
      AND event_hosts.event_id = events.id
      AND sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
    RETURNING
      events.id
  `;

  return event;
};

export const isEventGuest = cache(
  async (sessionToken: Session['token'], eventId: string) => {
    const [row] = await sql<{ isGuest: boolean }[]>`
      SELECT
        EXISTS (
          SELECT
            1
          FROM
            event_guests
            INNER JOIN sessions ON event_guests.user_id = sessions.user_id
          WHERE
            event_guests.event_id = ${eventId}::uuid
            AND sessions.token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        ) AS is_guest
    `;

    return Boolean(row?.isGuest);
  },
);

export const registerForEvent = async (
  sessionToken: Session['token'],
  eventId: string,
) => {
  const [guest] = await sql<Pick<Event, 'id'>[]>`
    WITH
    LOCK AS (
      SELECT
        pg_advisory_xact_lock(
          hashtext (
            ${eventId}::text
          )
        )
    )
    INSERT INTO
      event_guests (event_id, user_id, status)
    SELECT
      ${eventId}::uuid,
      sessions.user_id,
      'going'
    FROM
    LOCK,
    sessions
    INNER JOIN events ON events.id = ${eventId}::uuid
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND (
        SELECT
          count(*)
        FROM
          event_guests
        WHERE
          event_guests.event_id = ${eventId}::uuid
      ) < events.max_guests
    ON CONFLICT (event_id, user_id) DO NOTHING
    RETURNING
      event_guests.event_id AS id
  `;

  return guest;
};

export const unregisterFromEvent = async (
  sessionToken: Session['token'],
  eventId: string,
) => {
  const [guest] = await sql<Pick<Event, 'id'>[]>`
    DELETE FROM event_guests USING sessions
    WHERE
      event_guests.event_id = ${eventId}::uuid
      AND event_guests.user_id = sessions.user_id
      AND sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
    RETURNING
      event_guests.event_id AS id
  `;

  return guest;
};
