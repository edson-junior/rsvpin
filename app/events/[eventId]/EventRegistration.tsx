'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/app/components/ui/button';
import { registerForEventAction, unregisterFromEventAction } from '../actions';

type Props = {
  eventId: string;
  registered: boolean;
};

export function EventRegistration({ eventId, registered }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (registered) {
    return (
      <div>
        {error && <p className="text-sm text-destructive mb-2">{error}</p>}
        <Button
          variant="destructive"
          disabled={pending}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              const result = await unregisterFromEventAction(eventId);
              if (result?.error) {
                setError(result.error);
              }
            });
          }}
        >
          {pending ? 'Cancelling...' : 'Cancel registration'}
        </Button>
      </div>
    );
  }

  return (
    <div>
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}
      <Button
        className="w-full"
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const result = await registerForEventAction(eventId);
            if (result?.error) {
              setError(result.error);
            }
          });
        }}
      >
        {pending ? 'Registering...' : 'Register'}
      </Button>
    </div>
  );
}
