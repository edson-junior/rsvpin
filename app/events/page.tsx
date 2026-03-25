import { mockEvents } from '@/mocks/mockData';
import { EventCard } from '../components/EventCard';

export default async function Discover() {
  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-7xl">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            Find your next
            <br />
            <span className="bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              unforgettable
            </span>{' '}
            event!
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Curated events from the world's most vibrant communities. Workshops,
            socials, and experiences that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </main>
  );
}
