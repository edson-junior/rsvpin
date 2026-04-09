'use client';

import { useActionState, useState, useTransition } from 'react';
import EventForm from '@/app/components/EventForm';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import { deleteEventAction, updateEventAction } from '../../actions';

type Props = {
  eventId: string;
  defaultValues: {
    name: string;
    date: string;
    time: string;
    location: string;
    category: string;
    description: string;
    maxGuests: number;
    image: string | null;
  };
};

export function EditEventForm({ eventId, defaultValues }: Props) {
  const updateWithId = updateEventAction.bind(null, eventId);
  const [state, formAction, pending] = useActionState(updateWithId, {});
  const [isDeleting, startDeleteTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <EventForm
      action={formAction}
      defaultValues={defaultValues}
      errors={state.errors}
    >
      <div className="flex gap-3">
        <Button type="submit" className="group flex-1" disabled={pending}>
          {pending ? 'Saving...' : 'Save Changes'}
          <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button variant="outline" asChild>
          <Link href={`/events/${eventId}`}>Cancel</Link>
        </Button>
      </div>
      <div className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-destructive">
          Danger zone
        </h2>
        <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <div>
            <p className="text-sm font-medium text-foreground">
              Delete your event
            </p>
            <p className="text-xs text-muted-foreground">
              Permanently delete your event. This action is not reversible!
            </p>
            {deleteError && (
              <p className="text-xs text-destructive mt-1" role="alert">
                {deleteError}
              </p>
            )}
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" type="button">
                Delete event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Delete event</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this event? This action is
                permanent and cannot be undone.
              </DialogDescription>
              <div className="flex justify-end gap-3 mt-6">
                <DialogClose asChild>
                  <Button variant="outline" size="sm" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  disabled={isDeleting}
                  onClick={() => {
                    setDeleteError(null);
                    startDeleteTransition(async () => {
                      const result = await deleteEventAction(eventId);
                      if (result.errors?.general) {
                        setDeleteError(result.errors.general);
                        setDialogOpen(false);
                      }
                    });
                  }}
                >
                  {isDeleting ? 'Deleting...' : 'Delete event'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </EventForm>
  );
}
