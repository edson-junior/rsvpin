import { Button } from '@/app/components/ui/button';
import { getValidSession } from '@/database/sessions';
import { getSessionToken } from '@/lib/auth';
import { mockUsers } from '@/mocks/mockData';
import { notFound, redirect } from 'next/navigation';

export default async function Settings(
  props: PageProps<'/user/[username]/settings'>,
) {
  const { username: usernameParam } = await props.params;

  // Dashboard authorization steps in page
  // 1. Get session token from cookie
  const sessionToken = await getSessionToken();

  // 2. Check if session token is valid
  const session = !!sessionToken && (await getValidSession(sessionToken));

  // 3. If sessionToken is invalid, redirect to login page
  if (!session) {
    redirect(`/signin?returnTo=/user/${usernameParam}/settings`);
  }

  const user = mockUsers[0];

  if (!user) {
    return notFound();
  }

  const { name, username, bio, location, website } = user;

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow';

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

        {/* TODO: create suspense wrapper, along with a skeleton, and render form only on client side */}
        <hr className="shrink-0 bg-border h-px w-full my-8" />

        <form className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Profile
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Name
                </label>
                <input
                  id="name"
                  readOnly
                  value={name}
                  className={inputClass}
                  maxLength={100}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Username
                </label>
                <input
                  id="username"
                  readOnly
                  value={username}
                  className={inputClass}
                  maxLength={30}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="bio"
                className="text-sm font-medium text-foreground mb-1.5 block"
              >
                Bio
              </label>
              <textarea
                id="bio"
                readOnly
                value={bio ?? ''}
                rows={3}
                className={`${inputClass} resize-none`}
                maxLength={300}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Location
                </label>
                <input
                  id="location"
                  readOnly
                  value={location ?? ''}
                  className={inputClass}
                  maxLength={100}
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  readOnly
                  value={website ?? ''}
                  className={inputClass}
                  placeholder="https://"
                  maxLength={200}
                />
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
              </div>
              <Button variant="destructive" size="sm" type="button">
                Delete
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
