import { getAllEventsInsecure } from '@/database/events';
import type { Event } from '@/lib/types';
import { NextResponse } from 'next/server';

// GET (Read in CRUD)
export async function GET(): Promise<NextResponse<Event[]>> {
  const events = await getAllEventsInsecure();

  return NextResponse.json(events);
}
