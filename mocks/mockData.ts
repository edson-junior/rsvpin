import type { EventDetails, EventGuest, EventHost, User } from '@/lib/types';

type MockEventHost = EventHost & { eventId: string; createdAt: string };
type MockEventGuest = EventGuest & { eventId: string; createdAt: string };
type MockEvent = Omit<
  EventDetails,
  | 'date'
  | 'startsAt'
  | 'endsAt'
  | 'createdAt'
  | 'updatedAt'
  | 'url'
  | 'hosts'
  | 'guests'
> & {
  date: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  url?: string | null;
  hosts: MockEventHost[];
  guests: MockEventGuest[];
};

export const eventHosts: MockEventHost[] = [
  {
    eventId: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    userId: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    name: 'Ava Martinez',
    username: 'avamartinez',
    createdAt: '2026-03-10T09:15:00Z',
  },
  {
    eventId: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    userId: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    name: 'Noah Chen',
    username: 'noahchen',
    createdAt: '2026-03-12T14:00:00Z',
  },
];

export const eventGuests: MockEventGuest[] = [
  {
    eventId: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    userId: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
    name: 'Noah Chen',
    status: 'going',
    username: 'avamartinez',
    createdAt: '2026-03-11T09:15:00Z',
  },
  {
    eventId: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    userId: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
    name: 'Ava Martinez',
    status: 'going',
    username: 'noahchen',
    createdAt: '2026-03-12T14:00:00Z',
  },
];

export const mockUsers: User[] = [
  {
    id: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    name: 'Ava Martinez',
    email: 'ava.martinez@example.com',
    // passwordHash: 'P@ssw0rd123!',
    username: 'avamartinez',
    avatarUrl: 'https://example.com/avatars/ava.png',
    bio: 'Front-end developer and coffee enthusiast. Loves building accessible web apps.',
    createdAt: '2026-03-13T10:25:00Z',
    location: 'San Francisco, CA',
    website: 'alexjohnson.com',
    eventsHosted: 12,
    eventsAttended: 47,
  },
  {
    id: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
    name: 'Noah Chen',
    email: 'noah.chen@example.com',
    // passwordHash: 'Secure*Pass456',
    username: 'noahchen',
    avatarUrl: null,
    bio: 'Product manager who enjoys hiking and board games on weekends.',
    createdAt: '2026-03-13T14:52:00Z',
    location: 'San Francisco, CA',
    website: 'alexjohnson.com',
    eventsHosted: 12,
    eventsAttended: 47,
  },
];

export const mockEvents: MockEvent[] = [
  {
    id: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    name: 'Spring Community Meetup',
    image:
      'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwbmV0d29ya2luZyUyMGV2ZW50fGVufDF8fHx8MTc3MzY5NzY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description:
      'A casual meetup for local developers to share projects, network, and enjoy snacks.',
    date: '2026-04-20T00:00:00',
    location: 'Downtown Innovation Hub',
    category: 'Networking',
    locationType: 'offline',
    createdAt: '2026-03-10T09:15:00Z',
    startsAt: '2026-04-20T13:00:00Z',
    endsAt: '2026-04-20T17:00:00Z',
    maxGuests: 50,
    createdBy: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    hosts: [
      {
        userId: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
        eventId: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
        name: 'Ava Martinez',
        username: 'avamartinez',
        createdAt: '2026-03-12T14:00:00Z',
      },
    ],
    guests: [
      {
        userId: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
        eventId: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
        name: 'Noah Chen',
        username: 'noahchen',
        status: 'going',
        createdAt: '2026-03-11T09:15:00Z',
      },
    ],
  },
  {
    id: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    name: 'Remote Design Workshop',
    image:
      'https://images.unsplash.com/photo-1753162658596-2ccba5e4246a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMGNyZWF0aXZlJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM3MzIyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description:
      'A hands-on workshop for remote teams to level up their product design collaboration.',
    date: '2026-05-05T00:00:00',
    location: 'Zoom',
    category: 'Workshop',
    locationType: 'online',
    createdAt: '2026-03-12T14:00:00Z',
    startsAt: '2026-05-05T13:00:00Z',
    endsAt: '2026-05-05T17:00:00Z',
    maxGuests: 50,
    createdBy: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    hosts: [
      {
        userId: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
        eventId: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
        name: 'Ava Martinez',
        username: 'avamartinez',
        createdAt: '2026-03-12T14:00:00Z',
      },
    ],
    guests: [
      {
        userId: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
        eventId: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
        name: 'Noah Chen',
        username: 'noahchen',
        status: 'going',
        createdAt: '2026-03-11T09:15:00Z',
      },
    ],
  },
];
