'use client';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef } from 'react';

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

type Props = {
  onVerify?: (verified: boolean) => void;
};

export default function TurnstileWidget({ onVerify }: Props) {
  const ref = useRef<TurnstileInstance>(null);

  return (
    <Turnstile
      ref={ref}
      siteKey={siteKey}
      onSuccess={() => onVerify?.(true)}
      onExpire={() => onVerify?.(false)}
      onError={() => onVerify?.(false)}
      options={{ theme: 'light', size: 'flexible' }}
    />
  );
}
