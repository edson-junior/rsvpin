import EventForm from '@/app/components/EventForm';
import { Button } from '@/app/components/ui/button';
import { mockEvents } from '@/mocks/mockData';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Edit(
  props: PageProps<'/events/[eventId]/settings'>,
) {
  const { eventId: id } = await props.params;
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return notFound();
  }

  // const form = {
  //   title: event.name,
  //   description: event.description,
  //   date: event.date,
  //   time: event.starts_at,
  //   location: event.location,
  //   maxAttendees: String(event.maxAttendees),
  //   category: event.category,
  // };

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
          <Button type="submit" className="flex-1">
            Save Changes
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

      {/* <form className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Type className="w-4 h-4 text-primary" /> Event Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Design Systems Workshop"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className={inputClass}
            maxLength={100}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Calendar className="w-4 h-4 text-primary" /> Date *
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Clock className="w-4 h-4 text-primary" /> Time *
            </label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <MapPin className="w-4 h-4 text-primary" /> Location *
          </label>
          <input
            type="text"
            placeholder="e.g. San Francisco, CA"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            className={inputClass}
            maxLength={200}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Tag className="w-4 h-4 text-primary" /> Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className={inputClass}
            >
              {categories
                .filter((c) => c !== 'All')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Users className="w-4 h-4 text-primary" /> Max Attendees
            </label>
            <input
              type="number"
              placeholder="50"
              value={form.maxAttendees}
              onChange={(e) => update('maxAttendees', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Type className="w-4 h-4 text-primary" /> Description
          </label>
          <textarea
            placeholder="Tell people what your event is about..."
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={5}
            className={`${inputClass} resize-none`}
            maxLength={2000}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
          <Link
            to={`/event/${id}`}
            className="py-3.5 px-6 rounded-xl border border-border text-muted-foreground font-medium text-sm hover:bg-secondary transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </form> */}
    </main>
  );
}
