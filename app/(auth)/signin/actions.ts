'use server';

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getUserWithPasswordHashInsecure } from '@/database/users';
import { createSessionCookie } from '@/lib/auth';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getSafeReturnToPath } from '@/lib/validation';

const signInSchema = z.object({
  email: z.email('Invalid email address.').min(1, 'Email is required.').trim(),
  password: z.string().min(8, 'Password must be minimum 8 characters'),
});

type SignInState = {
  errors?: {
    email?: string;
    password?: string;
    general?: string;
  };
};

export async function signIn(
  returnTo: string | string[] | undefined,
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const turnstileToken = formData.get('cf-turnstile-response');

  if (
    typeof turnstileToken !== 'string' ||
    !(await verifyTurnstileToken(turnstileToken))
  ) {
    return {
      errors: { general: 'CAPTCHA verification failed. Please try again.' },
    };
  }

  const result = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;

    return {
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = result.data;

  const user = await getUserWithPasswordHashInsecure(email.toLowerCase());

  if (!user) {
    return { errors: { general: 'Invalid email or password.' } };
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);

  if (!passwordValid) {
    return { errors: { general: 'Invalid email or password.' } };
  }

  await createSessionCookie(user.id);

  redirect(getSafeReturnToPath(returnTo) || '/');
}
