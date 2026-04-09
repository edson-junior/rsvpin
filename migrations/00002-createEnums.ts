import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  // Create enum types
  await sql`CREATE TYPE location_type AS enum('offline', 'online');`;
  await sql`CREATE TYPE guest_status AS enum('going', 'not_going');`;
}

export async function down(sql: Sql) {
  await sql`DROP TYPE guest_status`;
  await sql`DROP TYPE location_type`;
}
