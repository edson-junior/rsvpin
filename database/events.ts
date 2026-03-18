import 'server-only';
import { cache } from 'react';
import { mockEvents } from '@/mocks/mockData';
import { sql } from './connect';

// "Read" in CRUD
export const getAllEventsInsecure = cache(async () => {
  // const animals = await sql<Event[]>`
  //   SELECT * FROM events;
  // `;
  return mockEvents;
});
