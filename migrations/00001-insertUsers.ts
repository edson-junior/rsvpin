import type { Sql } from 'postgres';

const users = [
  {
    id: '8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a',
    name: 'Ava Martinez',
    email: 'ava.martinez@example.com',
    password_hash: 'P@ssw0rd123!',
    username: 'avamartinez',
    avatar_url: 'https://example.com/avatars/ava.png',
    bio: 'Front-end developer and coffee enthusiast. Loves building accessible web apps.',
    location: 'San Francisco, CA',
    website: 'alexjohnson.com',
    created_at: '2026-03-13T10:25:00Z',
  },
  {
    id: 'f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d',
    name: 'Noah Chen',
    email: 'noah.chen@example.com',
    password_hash: 'Secure*Pass456',
    username: 'noahchen',
    avatar_url: null,
    bio: 'Product manager who enjoys hiking and board games on weekends.',
    location: 'San Francisco, CA',
    website: 'alexjohnson.com',
    created_at: '2026-03-13T14:52:00Z',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          id,
          name,
          email,
          password_hash,
          username,
          avatar_url,
          bio,
          location,
          website,
          created_at
        )
      VALUES
        (
          ${user.id}::uuid,
          ${user.name},
          ${user.email},
          ${user.password_hash},
          ${user.username},
          ${user.avatar_url},
          ${user.bio},
          ${user.location},
          ${user.website},
          ${user.created_at}::timestamptz
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}::uuid
    `;
  }
}
