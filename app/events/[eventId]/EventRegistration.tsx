'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/app/components/ui/button';
import { LuUserPlus, LuUserMinus } from 'react-icons/lu';
import { registerForEventAction, unregisterFromEventAction } from '../actions';
import { toast } from 'sonner';

type Props = {
  eventId: string;
  registered: boolean;
};

export function EventRegistration({ eventId, registered }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}
      <Button
        className="w-full"
        variant={registered ? 'destructive' : 'default'}
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const result = registered
              ? await unregisterFromEventAction(eventId)
              : await registerForEventAction(eventId);
            if (result?.error) {
              setError(result.error);
            } else if (registered) {
              toast('You have unregistered from this event.');
            } else {
              toast.success('You have registered for this event!');
            }
          });
        }}
      >
        {registered ? (
          <LuUserMinus className="w-4 h-4" />
        ) : (
          <LuUserPlus className="w-4 h-4" />
        )}
        {pending
          ? registered
            ? 'Unregistering...'
            : 'Registering...'
          : registered
            ? 'Unregister'
            : 'Register'}
      </Button>
    </div>
  );
}
