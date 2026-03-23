import { LuArrowRight, LuCalendar, LuMapPin, LuUsers } from 'react-icons/lu';
const events = [
  {
    title: 'Tech Summit 2026: Future of AI',
    date: 'Mar 25, 2026 • 9:00 AM',
    location: 'San Francisco, CA',
    attendees: 1240,
    image:
      'https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMGF1ZGllbmNlfGVufDF8fHx8MTc3MzY0NzUzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Technology',
  },
  {
    title: 'Startup Networking Mixer',
    date: 'Mar 22, 2026 • 6:00 PM',
    location: 'New York, NY',
    attendees: 487,
    image:
      'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwbmV0d29ya2luZyUyMGV2ZW50fGVufDF8fHx8MTc3MzY5NzY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Networking',
  },
  {
    title: 'Leadership in Modern Business',
    date: 'Mar 28, 2026 • 2:00 PM',
    location: 'Austin, TX',
    attendees: 654,
    image:
      'https://images.unsplash.com/photo-1770097317890-e98eb5515975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlbWluYXIlMjBzcGVha2VyfGVufDF8fHx8MTc3Mzc2NjcxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Business',
  },
  {
    title: 'Creative Workshop: Design Thinking',
    date: 'Mar 30, 2026 • 10:00 AM',
    location: 'Los Angeles, CA',
    attendees: 235,
    image:
      'https://images.unsplash.com/photo-1753162658596-2ccba5e4246a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMGNyZWF0aXZlJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM3MzIyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Workshop',
  },
  {
    title: 'Electronic Music Festival',
    date: 'Apr 5, 2026 • 8:00 PM',
    location: 'Miami, FL',
    attendees: 3200,
    image:
      'https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBsaWdodHN8ZW58MXx8fHwxNzczNjY0NTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Music',
  },
  {
    title: 'Contemporary Art Exhibition',
    date: 'Apr 10, 2026 • 5:00 PM',
    location: 'Chicago, IL',
    attendees: 892,
    image:
      'https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NzM3MjgxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Art',
  },
];

export default async function Discover() {
  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-7xl">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
            Find your next
            <br />
            <span className="bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              unforgettable
            </span>{' '}
            event
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Curated events from the world's most vibrant communities. Workshops,
            socials, and experiences that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <button className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700">
            <span>View All Events</span>
            <LuArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
}

export function EventCard({
  title,
  date,
  location,
  attendees,
  image,
  category,
}: EventCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4">
        <div
          className={`inline-block bg-gray-100 text-center align-middle w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
        >
          <div className="flex items-center justify-center w-full h-full">
            <img src={image} alt={title} />
          </div>
        </div>

        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs">
          {category}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg group-hover:text-purple-600 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LuCalendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LuMapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LuUsers className="w-4 h-4" />
          <span>{attendees} attending</span>
        </div>
      </div>
    </div>
  );
}
