'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  createEvent,
  deleteEvent,
  isEventHost,
  registerForEvent,
  unregisterFromEvent,
  updateEvent,
} from '@/database/events';
import { getSessionToken } from '@/lib/auth';

const eventSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Event title is required.')
    .max(100, 'Event title must be at most 100 characters.'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required.')
    .max(2000, 'Description must be at most 2000 characters.'),
  location: z
    .string()
    .trim()
    .min(1, 'Location is required.')
    .max(120, 'Location must be at most 120 characters.'),
  category: z
    .string()
    .trim()
    .min(1, 'Category is required.')
    .max(120, 'Category must be at most 120 characters.'),
  date: z
    .string()
    .min(1, 'Date is required.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
  time: z
    .string()
    .min(1, 'Time is required.')
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Time must be in HH:mm format.'),
  maxGuests: z.coerce
    .number()
    .int()
    .positive('Max guests must be a positive number.')
    .max(500, 'Max guests must be at most 500.'),
  image: z
    .url('Invalid image URL.')
    .trim()
    .nullable()
    .optional()
    .transform((val) => val || null),
});

export type EventFormState = {
  errors?: {
    name?: string;
    description?: string;
    location?: string;
    category?: string;
    date?: string;
    time?: string;
    maxGuests?: string;
    image?: string;
    general?: string;
  };
};

export async function createEventAction(
  prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    return { errors: { general: 'You must be signed in to create an event.' } };
  }

  const result = eventSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    location: formData.get('location'),
    category: formData.get('category'),
    date: formData.get('date'),
    time: formData.get('time'),
    maxGuests: formData.get('maxGuests'),
    image: formData.get('image') || null,
  });

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    return {
      errors: {
        name: fieldErrors.name?.[0],
        description: fieldErrors.description?.[0],
        location: fieldErrors.location?.[0],
        category: fieldErrors.category?.[0],
        date: fieldErrors.date?.[0],
        time: fieldErrors.time?.[0],
        maxGuests: fieldErrors.maxGuests?.[0],
        image: fieldErrors.image?.[0],
      },
    };
  }

  const {
    name,
    description,
    location,
    category,
    date,
    time,
    maxGuests,
    image,
  } = result.data;

  const startsAt = new Date(`${date}T${time}`);

  if (!Number.isFinite(startsAt.getTime())) {
    return { errors: { date: 'Invalid date or time.' } };
  }

  const endsAt = new Date(startsAt.getTime() + 2 * 60 * 60 * 1000); // default 2h duration

  const event = await createEvent(
    sessionToken,
    name,
    description,
    image,
    location,
    category,
    startsAt,
    endsAt,
    maxGuests,
  );

  if (!event) {
    return { errors: { general: 'Failed to create event.' } };
  }

  redirect(`/events/${event.id}`);
}

export async function updateEventAction(
  eventId: string,
  prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    return {
      errors: { general: 'You must be signed in to update an event.' },
    };
  }

  const result = eventSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    location: formData.get('location'),
    category: formData.get('category'),
    date: formData.get('date'),
    time: formData.get('time'),
    maxGuests: formData.get('maxGuests'),
    image: formData.get('image') || null,
  });

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    return {
      errors: {
        name: fieldErrors.name?.[0],
        description: fieldErrors.description?.[0],
        location: fieldErrors.location?.[0],
        category: fieldErrors.category?.[0],
        date: fieldErrors.date?.[0],
        time: fieldErrors.time?.[0],
        maxGuests: fieldErrors.maxGuests?.[0],
        image: fieldErrors.image?.[0],
      },
    };
  }

  const {
    name,
    description,
    location,
    category,
    date,
    time,
    maxGuests,
    image,
  } = result.data;

  const startsAt = new Date(`${date}T${time}`);

  if (!Number.isFinite(startsAt.getTime())) {
    return { errors: { date: 'Invalid date or time.' } };
  }

  const endsAt = new Date(startsAt.getTime() + 2 * 60 * 60 * 1000);

  const event = await updateEvent(
    sessionToken,
    eventId,
    name,
    description,
    image,
    location,
    category,
    startsAt,
    endsAt,
    maxGuests,
  );

  if (!event) {
    return { errors: { general: 'Failed to update event.' } };
  }

  redirect(`/events/${event.id}`);
}

export async function deleteEventAction(
  eventId: string,
): Promise<EventFormState> {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    return {
      errors: { general: 'You must be signed in to delete an event.' },
    };
  }

  const event = await deleteEvent(sessionToken, eventId);

  if (!event) {
    return { errors: { general: 'Failed to delete event.' } };
  }

  redirect('/events');
}

export async function registerForEventAction(eventId: string) {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    redirect(`/signin?returnTo=/events/${eventId}`);
  }

  const isHost = await isEventHost(sessionToken, eventId);

  if (isHost) {
    return;
  }

  const guest = await registerForEvent(sessionToken, eventId);

  if (!guest) {
    return { error: 'Registration failed. The event may be full.' };
  }

  revalidatePath(`/events/${eventId}`);
}

export async function unregisterFromEventAction(eventId: string) {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    redirect(`/signin?returnTo=/events/${eventId}`);
  }

  const guest = await unregisterFromEvent(sessionToken, eventId);

  if (!guest) {
    return { error: 'Failed to cancel registration.' };
  }

  revalidatePath(`/events/${eventId}`);
}
