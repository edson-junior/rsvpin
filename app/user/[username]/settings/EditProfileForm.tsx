'use client';

import { useActionState, useState, useTransition } from 'react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { deleteAccountAction, updateProfileAction } from '../../actions';

type Props = {
  username: string;
  defaultValues: {
    name: string;
    username: string;
    bio: string;
    location: string;
    website: string;
  };
};

export function EditProfileForm({ username, defaultValues }: Props) {
  const [state, formAction, pending] = useActionState(updateProfileAction, {});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow';
  const labelClass = 'text-sm font-medium text-foreground mb-1.5 block';
  const errorClass = 'text-xs text-destructive mt-1';

  return (
    <form action={formAction} className="space-y-8">
      {state.errors?.general && (
        <p className="text-sm text-destructive" role="alert">
          {state.errors.general}
        </p>
      )}

      <div className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Profile
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={defaultValues.name}
              className={inputClass}
              maxLength={120}
              required
            />
            {state.errors?.name && (
              <span className={errorClass}>{state.errors.name}</span>
            )}
          </div>
          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              id="username"
              name="username"
              defaultValue={defaultValues.username}
              className={inputClass}
              maxLength={100}
              required
            />
            {state.errors?.username && (
              <span className={errorClass}>{state.errors.username}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="bio" className={labelClass}>
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            defaultValue={defaultValues.bio}
            rows={3}
            className={`${inputClass} resize-none`}
            maxLength={300}
          />
          {state.errors?.bio && (
            <span className={errorClass}>{state.errors.bio}</span>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              id="location"
              name="location"
              defaultValue={defaultValues.location}
              className={inputClass}
              maxLength={120}
            />
            {state.errors?.location && (
              <span className={errorClass}>{state.errors.location}</span>
            )}
          </div>
          <div>
            <label htmlFor="website" className={labelClass}>
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              defaultValue={defaultValues.website}
              className={inputClass}
              placeholder="https://"
              maxLength={200}
            />
            {state.errors?.website && (
              <span className={errorClass}>{state.errors.website}</span>
            )}
          </div>
        </div>
      </div>

      <hr className="shrink-0 bg-border h-px w-full" />

      {/* Danger Zone */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-destructive">
          Danger zone
        </h2>
        <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <div>
            <p className="text-sm font-medium text-foreground">
              Delete account
            </p>
            <p className="text-xs text-muted-foreground">
              Permanently remove your account and all data
            </p>
            {deleteError && (
              <p className="text-xs text-destructive mt-1" role="alert">
                {deleteError}
              </p>
            )}
          </div>
          <Button
            variant="destructive"
            size="sm"
            type="button"
            disabled={isDeleting}
            onClick={() => {
              if (!confirmDelete) {
                setConfirmDelete(true);
                return;
              }
              setDeleteError(null);
              startDeleteTransition(async () => {
                const result = await deleteAccountAction();
                if (result.errors?.general) {
                  setDeleteError(result.errors.general);
                }
              });
            }}
            onBlur={() => setConfirmDelete(false)}
          >
            {isDeleting
              ? 'Deleting...'
              : confirmDelete
                ? 'Are you sure?'
                : 'Delete'}
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" asChild>
          <Link href={`/user/${username}`}>Cancel</Link>
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
