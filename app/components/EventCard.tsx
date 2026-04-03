import Link from 'next/link';
import { LuCalendar, LuMapPin, LuUsers } from 'react-icons/lu';
import type { EventWithGuestCount } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

export function EventCard({
  id,
  name,
  startsAt,
  location,
  locationType,
  image,
  category,
  guestCount,
}: EventWithGuestCount) {
  const formattedDate = formatDate(startsAt);

  return (
    <Link href={`/events/${id}`} className="group">
      <div className="w-full aspect-video relative mb-4 overflow-hidden rounded-md bg-secondary">
        <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
          {image ? (
            <Image
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1340px) 832px, (min-width: 1040px) calc(85.71vw - 299px), 50vw"
              src={image}
              alt={name}
              className="object-cover transition duration-200 ease-in-out transform group-hover:scale-110"
            />
          ) : (
            <span className="text-6xl font-display font-bold text-foreground/5">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs">
          {category}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="font-display font-semibold text-lg group-hover:text-red-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LuCalendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LuMapPin className="w-4 h-4" />
          {locationType === 'offline' ? (
            <span>{location}</span>
          ) : (
            <span>Online</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LuUsers className="w-4 h-4" />
          <span>{guestCount} attending</span>
        </div>
      </div>
    </Link>
  );
}
