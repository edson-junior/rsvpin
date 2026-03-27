import type { Sql } from 'postgres';
import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().max(255),
  description: z.string(),
  image: z.string().nullable(),
  location: z.string().max(120),
  category: z.string().max(120),
  location_type: z.enum(['offline', 'online']),
  url: z.string().nullable(),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
  max_guests: z.number().int().positive(),
  created_by: z.uuid(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name varchar(255) NOT NULL,
      description text NOT NULL,
      image text,
      location varchar(120) NOT NULL,
      category varchar(120) NOT NULL,
      location_type location_type NOT NULL,
      url text,
      starts_at timestamptz NOT NULL,
      ends_at timestamptz NOT NULL,
      max_guests integer NOT NULL CHECK (max_guests > 0),
      created_by uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE events`;
}
