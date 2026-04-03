import { getUserBySessionToken } from '@/database/users';
import { getSessionToken } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { EditProfileForm } from './EditProfileForm';

export default async function Settings(
  props: PageProps<'/user/[username]/settings'>,
) {
  const { username: usernameParam } = await props.params;

  // Dashboard authorization steps in page
  // 1. Get session token from cookie
  const sessionToken = await getSessionToken();

  // 2. Check if session token is valid and get user
  const user = sessionToken
    ? await getUserBySessionToken(sessionToken)
    : undefined;

  // 3. If no valid session, redirect to login page
  if (!user) {
    redirect(`/signin?returnTo=/user/${usernameParam}/settings`);
  }

  // 4. If the logged-in user doesn't own this profile, block access
  if (user.username !== usernameParam) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pt-32 md:pt-40 pb-20 md:h-screen">
      <div className="flex flex-col">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your profile and preferences
          </p>
        </div>

        <hr className="shrink-0 bg-border h-px w-full my-8" />

        <EditProfileForm
          username={user.username}
          defaultValues={{
            name: user.name,
            username: user.username,
            bio: user.bio ?? '',
            location: user.location ?? '',
            website: user.website ?? '',
          }}
        />
      </div>
    </main>
  );
}
