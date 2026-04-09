'use client';

import { useActionState } from 'react';
import EventForm from '@/app/components/EventForm';
import { Button } from '@/app/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { createEventAction } from '../actions';

export function CreateEventForm() {
  const [state, formAction, pending] = useActionState(createEventAction, {});

  return (
    <EventForm action={formAction} errors={state.errors}>
      <Button
        className="group w-full py-3.5 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        disabled={pending}
      >
        {pending ? 'Creating...' : 'Create Event'}
        <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </EventForm>
  );
}
