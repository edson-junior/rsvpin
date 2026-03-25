import EventForm from '@/app/components/EventForm';
import { Button } from '@/app/components/ui/button';

export default async function Create() {
  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">
        Create Event
      </h1>
      <p className="text-muted-foreground mb-8">
        Fill in the details to create a beautiful event page.
      </p>

      <EventForm>
        <Button className="w-full py-3.5 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          Create Event
        </Button>
      </EventForm>
    </main>
  );
}
