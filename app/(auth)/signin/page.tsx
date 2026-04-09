import Link from 'next/link';
import SignInForm from './SignInForm';
import { getValidSession } from '@/database/sessions';
import { redirect } from 'next/navigation';
import { getSessionToken } from '@/lib/auth';

export const metadata = {
  title: 'Sign',
  description: 'Login for Widgets Anonymous',
};

export default async function SignInPage(props: PageProps<'/signin'>) {
  // Logged in user redirect steps in page
  // 1. Get session token from cookie
  const sessionToken = await getSessionToken();

  // 2. Check if session token is valid
  const session = !!sessionToken && (await getValidSession(sessionToken));

  // 3. If session token is valid, redirect to homepage
  if (session) {
    redirect('/');
  }

  const searchParams = await props.searchParams;
  const returnTo = searchParams.returnTo;

  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 md:pt-40 pb-20 md:h-[80vh]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">
          Welcome back! 🎉
        </h1>

        <p className="text-muted-foreground mb-8">
          Sign in to your RSVPin account.
        </p>

        <SignInForm returnTo={returnTo} />

        <p className="text-muted-foreground text-sm border-t border-border pt-8 mt-8 text-center">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
