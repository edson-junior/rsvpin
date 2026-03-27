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

CREATE TYPE location_type AS enum('offline', 'online');

CREATE TYPE guest_status AS enum('going', 'not_going');

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(120) NOT NULL,
  email varchar(80) NOT NULL UNIQUE,
  password_hash varchar(120) NOT NULL,
  username varchar(100) NOT NULL UNIQUE,
  avatar_url text,
  bio text,
  location varchar(120),
  website varchar(120),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

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

CREATE TABLE event_hosts (
  event_id uuid NOT NULL REFERENCES events (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, user_id)
);

CREATE TABLE event_guests (
  event_id uuid NOT NULL REFERENCES events (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  status guest_status DEFAULT 'going',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, user_id)
);

CREATE TABLE "sessions" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token varchar(150) NOT NULL UNIQUE,
  expiry_timestamp timestamptz NOT NULL DEFAULT now() + interval '24 hours',
  -- ON DELETE CASCADE: delete all sessions when user is deleted
  user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE
);
