import 'server-only';
import { cache } from 'react';
import { sql } from './connect';

export type Event = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  location: string;
  category: string;
  locationType: 'offline' | 'online';
  url: string | null;
  startsAt: Date;
  endsAt: Date;
  maxGuests: number;
  createdBy: string;
  createdAt: Date;
  guestCount: number;
};

// "Read" in CRUD
export const getAllEventsInsecure = cache(async () => {
  return await sql<Event[]>`
    SELECT
      events.*,
      (
        count(event_guests.user_id) FILTER (
          WHERE
            event_guests.status = 'going'
        )
      )::integer AS guest_count
    FROM
      events
      LEFT JOIN event_guests ON events.id = event_guests.event_id
    GROUP BY
      events.id
    ORDER BY
      events.starts_at ASC
  `;
});
