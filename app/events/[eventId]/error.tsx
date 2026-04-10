'use client';

import ErrorPage from '@/app/components/ErrorPage';

export default function EventDetailError() {
  return (
    <ErrorPage message="We couldn't load this event. Please try again later." />
  );
}
