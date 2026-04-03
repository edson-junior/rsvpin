'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { deleteUser, updateUser } from '@/database/users';
import { deleteSessionCookie, getSessionToken } from '@/lib/auth';

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(120, 'Name must be at most 120 characters.'),
  username: z
    .string()
    .trim()
    .min(1, 'Username is required.')
    .max(100, 'Username must be at most 100 characters.')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, hyphens, and underscores.',
    ),
  bio: z
    .string()
    .trim()
    .max(300, 'Bio must be at most 300 characters.')
    .transform((val) => val || null),
  location: z
    .string()
    .trim()
    .max(120, 'Location must be at most 120 characters.')
    .transform((val) => val || null),
  website: z
    .string()
    .trim()
    .max(200, 'Website must be at most 200 characters.')
    .transform((val) => val || null)
    .pipe(z.string().url('Invalid website URL.').nullable()),
});

export type ProfileFormState = {
  errors?: {
    name?: string;
    username?: string;
    bio?: string;
    location?: string;
    website?: string;
    general?: string;
  };
};

export async function updateProfileAction(
  prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    return {
      errors: { general: 'You must be signed in to update your profile.' },
    };
  }

  const result = profileSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    bio: formData.get('bio'),
    location: formData.get('location'),
    website: formData.get('website'),
  });

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    return {
      errors: {
        name: fieldErrors.name?.[0],
        username: fieldErrors.username?.[0],
        bio: fieldErrors.bio?.[0],
        location: fieldErrors.location?.[0],
        website: fieldErrors.website?.[0],
      },
    };
  }

  const { name, username, bio, location, website } = result.data;

  const user = await updateUser(
    sessionToken,
    name,
    username,
    bio,
    location,
    website,
  );

  if (!user) {
    return { errors: { general: 'Failed to update profile.' } };
  }

  redirect(`/user/${user.username}`);
}

export async function deleteAccountAction(): Promise<ProfileFormState> {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    return {
      errors: { general: 'You must be signed in to delete your account.' },
    };
  }

  const user = await deleteUser(sessionToken);

  if (!user) {
    return { errors: { general: 'Failed to delete account.' } };
  }

  await deleteSessionCookie();
  redirect('/');
}
