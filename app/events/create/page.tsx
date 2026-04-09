import { getSessionToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { CreateEventForm } from './CreateEventForm';

export default async function Create() {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    redirect('/signin?returnTo=/events/create');
  }

  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">
        Create Event
      </h1>
      <p className="text-muted-foreground mb-8">
        Fill in the details to create a beautiful event page.
      </p>

      <CreateEventForm />
    </main>
  );
}
