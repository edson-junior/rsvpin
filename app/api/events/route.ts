import { getAllEventsInsecure } from '@/database/events';
import type { Event } from '@/mocks/mockData';
import { NextResponse } from 'next/server';

export type EventsResponse = {
  events: Event[];
};

// GET (Read in CRUD)
export async function GET(): Promise<NextResponse<EventsResponse>> {
  const events = await getAllEventsInsecure();

  return NextResponse.json({ events });
}
