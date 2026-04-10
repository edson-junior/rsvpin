'use client';

import ErrorPage from '@/app/components/ErrorPage';

export default function EventSettingsError() {
  return (
    <ErrorPage message="We couldn't load the event settings. Please try again later." />
  );
}
