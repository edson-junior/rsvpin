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
  location: string;
  category: string;
  locationType: 'offline' | 'online';
  url: string | null;
  startsAt: Date;
  endsAt: Date;
  maxGuests: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EventHost = {
  userId: string;
  name: string;
  username: string;
};

export type EventGuest = {
  userId: string;
  name: string;
  username: string;
  status: 'going' | 'not_going' | null;
};

export type EventDetails = Event & {
  date: Date;
  hosts: EventHost[] | null;
  guests: EventGuest[] | null;
};

export type EventWithGuestCount = Event & {
  guestCount: number;
};
