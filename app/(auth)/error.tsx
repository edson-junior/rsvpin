'use client';

import ErrorPage from '@/app/components/ErrorPage';

export default function AuthError() {
  return (
    <ErrorPage message="We couldn't process your request. Please try again later." />
  );
}
