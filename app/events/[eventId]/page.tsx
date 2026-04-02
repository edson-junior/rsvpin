import { Button } from '@/app/components/ui/button';
import { getEventByIdInsecure, isEventHost } from '@/database/events';
import { getSessionToken } from '@/lib/auth';
import { formatDate, formatTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  LuArrowLeft,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuShare2,
  LuUsers,
} from 'react-icons/lu';

export default async function EventPage(props: PageProps<'/events/[eventId]'>) {
  const { eventId: id } = await props.params;
  const event = await getEventByIdInsecure(id);
  const registered = false;

  const sessionToken = await getSessionToken();
  const isHost = sessionToken ? await isEventHost(sessionToken, id) : false;

  if (!event) {
    return notFound();
  }

  const formattedDate = formatDate(event.date);
  const formattedTime = formatTime(event.startsAt);

  const guests = event.guests ?? [];
  const hosts = event.hosts ?? [];

  const spotsLeft = event.maxGuests - guests.length;
  const fillPercent = (guests.length / event.maxGuests) * 100;

  return (
    <main className="max-w-4xl mx-auto px-4 pt-32 md:pt-40 pb-20">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <LuArrowLeft className="w-4 h-4" />
        Back to events
      </Link>

      {/* Header image */}
      <div className="aspect-2/1 rounded-2xl bg-secondary overflow-hidden mb-8">
        <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
          {event.image ? (
            <Image
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1340px) 832px, (min-width: 1040px) calc(85.71vw - 299px), 50vw"
              src={event.image}
              alt={event.name}
              className="object-cover transition duration-200 ease-in-out transform group-hover:scale-110"
            />
          ) : (
            <span className="text-8xl font-display font-bold text-foreground/5">
              {event.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {event.category}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {event.name}
          </h1>

          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3 text-muted-foreground">
              <LuCalendar className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <LuClock className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm">{formattedTime}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <LuMapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">
              About
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">
              Hosted by
            </h2>
            {hosts.map((host) => {
              return (
                <Link
                  href={`/user/${host.username}`}
                  key={`host-${host.userId}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {host.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {host.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Event Organizer
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <LuUsers className="w-3.5 h-3.5" />
                  {guests.length} attending
                </span>
                <span className="text-muted-foreground">
                  {spotsLeft} spots left
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            </div>

            {registered ? (
              <div className="text-center">
                <div className="py-3 px-4 rounded-xl bg-primary/10 text-primary text-sm font-medium mb-3">
                  ✓ You're registered!
                </div>
                <Button variant="destructive">Cancel registration</Button>
              </div>
            ) : (
              <Button className="w-full">Register</Button>
            )}

            {isHost && (
              <Button variant="destructive" asChild>
                <Link
                  href={`/events/${event.id}/settings`}
                  className="w-full mt-2"
                >
                  Edit event
                </Link>
              </Button>
            )}

            <Button variant="outline" className="w-full mt-3">
              <LuShare2 className="w-3.5 h-3.5" />
              Share event
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
