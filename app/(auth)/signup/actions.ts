'use server';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createUserInsecure,
  getUserByEmailInsecure,
  getUserByUsernameInsecure,
} from '@/database/users';
import { createSessionCookie } from '@/lib/auth';
import { getSafeReturnToPath } from '@/lib/validation';

const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120),
  email: z
    .email('Invalid email address.')
    .trim()
    .min(1, 'Email is required.')
    .max(80),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters.')
    .max(100)
    .regex(
      /^[a-z0-9_]+$/i,
      'Username can only contain letters, numbers, and underscores.',
    ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .max(120),
});

type SignUpState = {
  errors?: {
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    general?: string;
  };
};

export async function signUp(
  returnTo: string | string[] | undefined,
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const result = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;

    return {
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  const { name, email, username, password } = result.data;
  const normalizedEmail = email.toLowerCase();
  const normalizedUsername = username.toLowerCase();

  const existingEmail = await getUserByEmailInsecure(normalizedEmail);
  if (existingEmail) {
    return { errors: { email: 'An account with this email already exists.' } };
  }

  const existingUsername = await getUserByUsernameInsecure(normalizedUsername);
  if (existingUsername) {
    return { errors: { username: 'This username is already taken.' } };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = await createUserInsecure(
    name,
    normalizedEmail,
    normalizedUsername,
    passwordHash,
  );

  if (!newUser) {
    return { errors: { general: 'Registration failed. Please try again.' } };
  }

  await createSessionCookie(newUser.id);

  redirect(getSafeReturnToPath(returnTo) || '/');
}
