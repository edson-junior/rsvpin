'use client';

import ErrorPage from '@/app/components/ErrorPage';

export default function UserSettingsError() {
  return (
    <ErrorPage message="We couldn't load your settings. Please try again later." />
  );
}
