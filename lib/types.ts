export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
  eventsHosted?: number;
  eventsAttended?: number;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  date: string;
  location: string;
  category: string;
  locationType: 'offline' | 'online';
  url?: string | null;
  startsAt: string | Date;
  endsAt: string | Date;
  maxGuests: number;
  createdBy: string;
  createdAt: string | Date;
  guestCount?: number;
  hosts: EventHost[];
  guests: EventGuest[];
};

export type EventHost = {
  userId: string;
  eventId: string;
  name: string;
  username: string;
  createdAt: string;
};

export type EventGuest = {
  userId: string;
  eventId: string;
  name: string;
  username: string;
  status: 'going' | 'not_going';
  createdAt: string;
};
