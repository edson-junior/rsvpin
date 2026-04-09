import type { Sql } from 'postgres';

const events = [
  {
    id: 'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    name: 'Spring Community Meetup',
    description:
      'A casual meetup for local developers to share projects, network, and enjoy snacks.',
    image:
      'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwbmV0d29ya2luZyUyMGV2ZW50fGVufDF8fHx8MTc3MzY5NzY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Downtown Innovation Hub',
    category: 'Networking',
    location_type: 'offline',
    url: 'https://example.com/events/spring-meetup',
    starts_at: '2026-04-20T13:00:00Z',
    ends_at: '2026-04-20T17:00:00Z',
    max_guests: 50,
    created_by: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    created_at: '2026-03-10T09:15:00Z',
  },
  {
    id: 'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    name: 'Remote Design Workshop',
    description:
      'A hands-on workshop for remote teams to level up their product design collaboration.',
    image:
      'https://images.unsplash.com/photo-1753162658596-2ccba5e4246a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMGNyZWF0aXZlJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM3MzIyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Zoom',
    category: 'Workshop',
    location_type: 'online',
    url: 'https://example.com/events/remote-design',
    starts_at: '2026-05-05T13:00:00Z',
    ends_at: '2026-05-05T17:00:00Z',
    max_guests: 50,
    created_by: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    created_at: '2026-03-12T14:00:00Z',
  },
];

export async function up(sql: Sql) {
  for (const event of events) {
    await sql`
      INSERT INTO
        events (
          id,
          name,
          description,
          image,
          location,
          category,
          location_type,
          url,
          starts_at,
          ends_at,
          max_guests,
          created_by,
          created_at
        )
      VALUES
        (
          ${event.id}::uuid,
          ${event.name},
          ${event.description},
          ${event.image},
          ${event.location},
          ${event.category},
          ${event.location_type}::location_type,
          ${event.url},
          ${event.starts_at}::timestamptz,
          ${event.ends_at}::timestamptz,
          ${event.max_guests},
          ${event.created_by}::uuid,
          ${event.created_at}::timestamptz
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`
      DELETE FROM events
      WHERE
        id = ${event.id}::uuid
    `;
  }
}
