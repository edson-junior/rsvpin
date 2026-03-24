export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  avatar_url?: string | null;
  bio?: string | null;
  created_at: string;
}

export interface EventGuest {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  location_type: 'offline' | 'online';
  url?: string | null;
  created_at: string;
  starts_at: string;
  ends_at: string;
  maxAttendees: number;
  hosts: EventGuest[];
  guests: EventGuest[];
}

export const mockUsers: User[] = [
  {
    id: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    name: 'Ava Martinez',
    email: 'ava.martinez@example.com',
    password: 'P@ssw0rd123!',
    username: 'avamartinez',
    avatar_url: 'https://example.com/avatars/ava.png',
    bio: 'Front-end developer and coffee enthusiast. Loves building accessible web apps.',
    created_at: '2026-03-13T10:25:00Z',
  },
  {
    id: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
    name: 'Noah Chen',
    email: 'noah.chen@example.com',
    password: 'Secure*Pass456',
    username: 'noahchen',
    avatar_url: null,
    bio: 'Product manager who enjoys hiking and board games on weekends.',
    created_at: '2026-03-13T14:52:00Z',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    name: 'Spring Community Meetup',
    description:
      'A casual meetup for local developers to share projects, network, and enjoy snacks.',
    date: '2026-04-20T00:00:00',
    location: 'Downtown Innovation Hub',
    category: 'Networking',
    location_type: 'offline',
    url: 'https://example.com/events/spring-meetup',
    created_at: '2026-03-10T09:15:00Z',
    starts_at: '2026-04-20T13:00:00Z',
    ends_at: '2026-04-20T17:00:00Z',
    maxAttendees: 50,
    hosts: [
      {
        id: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
        name: 'Ava Martinez',
      },
    ],
    guests: [
      {
        id: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
        name: 'Noah Chen',
      },
    ],
  },
  {
    id: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    name: 'Remote Design Workshop',
    description:
      'A hands-on workshop for remote teams to level up their product design collaboration.',
    date: '2026-05-05T00:00:00',
    location: 'Zoom',
    category: 'Workshop',
    location_type: 'online',
    url: 'https://example.com/events/remote-design',
    created_at: '2026-03-12T14:00:00Z',
    starts_at: '2026-05-05T13:00:00Z',
    ends_at: '2026-05-05T17:00:00Z',
    maxAttendees: 50,
    hosts: [
      {
        id: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
        name: 'Ava Martinez',
      },
    ],
    guests: [
      {
        id: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
        name: 'Noah Chen',
      },
    ],
  },
];
