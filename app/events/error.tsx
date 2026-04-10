'use client';

import ErrorPage from '@/app/components/ErrorPage';

export default function EventsError() {
  return (
    <ErrorPage message="We couldn't load the events. Please try again later." />
  );
}
