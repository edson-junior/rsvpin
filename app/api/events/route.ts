import { getAllEventsInsecure, type Event } from '@/database/events';
import { NextResponse } from 'next/server';

// GET (Read in CRUD)
export async function GET(): Promise<NextResponse<Event[]>> {
  const events = await getAllEventsInsecure();

  return NextResponse.json(events);
}
