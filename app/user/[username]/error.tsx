'use client';

import ErrorPage from '@/app/components/ErrorPage';

export default function UserProfileError() {
  return (
    <ErrorPage message="We couldn't load this profile. Please try again later." />
  );
}
