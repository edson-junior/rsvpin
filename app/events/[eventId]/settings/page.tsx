import EventForm from '@/app/components/EventForm';
import { Button } from '@/app/components/ui/button';
import { mockEvents } from '@/mocks/mockData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuArrowRight } from 'react-icons/lu';

export default async function EditEventPage(
  props: PageProps<'/events/[eventId]/settings'>,
) {
  const { eventId: id } = await props.params;
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">
        Edit Event
      </h1>
      <p className="text-muted-foreground mb-8">
        Update the details for your event.
      </p>

      <EventForm>
        <div className="flex gap-3">
          <Button type="submit" className="group flex-1">
            Save Changes
            <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button variant="outline" asChild>
            <Link href={`/events/${id}`}>Cancel</Link>
          </Button>
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-destructive">
            Danger zone
          </h2>
          <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
            <div>
              <p className="text-sm font-medium text-foreground">
                Delete your event
              </p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your event. This action is not reversible!
              </p>
            </div>
            <Button variant="destructive" size="sm" type="button">
              Delete event
            </Button>
          </div>
        </div>
      </EventForm>
    </main>
  );
}
