-- CREATE DATABASE next_js_example_winter_2026_eu;
-- CREATE USER next_js_example_winter_2026_eu
-- WITH
--   encrypted password 'next_js_example_winter_2026_eu';
-- GRANT ALL privileges ON database next_js_example_winter_2026_eu TO next_js_example_winter_2026_eu;
-- -- \connect next_js_example_winter_2026_eu
-- CREATE SCHEMA next_js_example_winter_2026_eu AUTHORIZATION next_js_example_winter_2026_eu;
-- CREATE TYPE location_options AS ENUM ('offline', 'online');
CREATE DATABASE rsvpin_2026;

CREATE USER rsvpin_2026
WITH
  encrypted password rsvpin_2026;

GRANT ALL privileges ON database rsvpin TO rsvpin_2026;

-- \connect rsvpin_2026
CREATE SCHEMA public AUTHORIZATION rsvpin_2026;

GRANT ALL privileges ON schema public TO rsvpin_2026;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  avatar_url varchar(255),
  bio text,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  location varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  location_type location_options NOT NULL DEFAULT 'offline',
  url varchar(255),
  created_at timestamp NOT NULL DEFAULT now(),
  starts_at date NOT NULL,
  ends_at date NOT NULL,
  hosts jsonb,
  guests jsonb
);

INSERT INTO
  events (
    id,
    name,
    description,
    date,
    location,
    category,
    location_type,
    url,
    created_at,
    starts_at,
    ends_at,
    hosts,
    guests
  )
VALUES
  (
    'd2f1c3a9-4b5e-4c77-a2f1-5e3a9b8c4d2f',
    'Spring Community Meetup',
    'A casual meetup for local developers to share projects, network, and enjoy snacks.',
    '2026-04-20',
    'Downtown Innovation Hub',
    'Networking',
    'offline',
    'https://example.com/events/spring-meetup',
    '2026-03-10T09:15:00Z',
    '2026-04-20',
    '2026-04-20',
    '[
      {
        "id": "8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a",
        "name": "Ava Martinez"
      }
    ]',
    '[
      {
        "id": "f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d",
        "name": "Noah Chen"
      }
    ]'
  ),
  (
    'a1c5f7d8-9b3e-4c6a-8f1d-2a7b3c5d9e0f',
    'Remote Design Workshop',
    'A hands-on workshop for remote teams to level up their product design collaboration.',
    '2026-05-05',
    'Zoom',
    'Workshop',
    'online',
    'https://example.com/events/remote-design',
    '2026-03-12T14:00:00Z',
    '2026-05-05',
    '2026-05-05',
    '[
      {
        "id": "8b7a4f2e-1d3a-4b9f-9c44-2e7f0c4d9e5a",
        "name": "Ava Martinez"
      }
    ]',
    '[
      {
        "id": "f3d9c6a7-5b4e-4a2d-bf11-9c6a8e7f3b2d",
        "name": "Noah Chen"
      }
    ]'
  );
