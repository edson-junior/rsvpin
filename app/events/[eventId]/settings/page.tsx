import { isEventHost } from '@/database/events';
import { getEventByIdInsecure } from '@/database/events';
import { getSessionToken } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { EditEventForm } from './EditEventForm';

export default async function EditEventPage(
  props: PageProps<'/events/[eventId]/settings'>,
) {
  const { eventId: id } = await props.params;

  // 1. Get session token from cookie
  const sessionToken = await getSessionToken();

  // 2. If no valid session, redirect to login page
  if (!sessionToken) {
    redirect(`/signin?returnTo=/events/${id}/settings`);
  }

  // 3. Check if the user is a host of this event
  const isHost = await isEventHost(sessionToken, id);

  if (!isHost) {
    return notFound();
  }

  // 4. Fetch event data for the form
  const event = await getEventByIdInsecure(id);

  if (!event) {
    return notFound();
  }

  const startsAt = new Date(event.startsAt);
  const date = startsAt.toISOString().slice(0, 10);
  const time = startsAt.toISOString().slice(11, 16);

  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">
        Edit Event
      </h1>
      <p className="text-muted-foreground mb-8">
        Update the details for your event.
      </p>

      <EditEventForm
        eventId={id}
        defaultValues={{
          name: event.name,
          date,
          time,
          location: event.location,
          category: event.category,
          description: event.description,
          maxGuests: event.maxGuests,
        }}
      />
    </main>
  );
}
