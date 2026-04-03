import {
  LuCalendar,
  LuLink,
  LuMapPin,
  LuPencil,
  LuUsers,
} from 'react-icons/lu';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { getEventsHostedByUsernameInsecure } from '@/database/events';
import {
  getUserProfileByUsernameInsecure,
  getUserBySessionToken,
} from '@/database/users';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { getSessionToken } from '@/lib/auth';

const Profile = async (props: PageProps<'/user/[username]'>) => {
  const { username: usernameParam } = await props.params;

  const sessionTokenPromise = getSessionToken();

  const [user, hostedEvents, loggedInUser] = await Promise.all([
    getUserProfileByUsernameInsecure(usernameParam),
    getEventsHostedByUsernameInsecure(usernameParam),
    sessionTokenPromise.then((token) =>
      token ? getUserBySessionToken(token) : undefined,
    ),
  ]);

  if (!user) {
    return notFound();
  }

  const isOwner = loggedInUser?.username === user.username;

  return (
    <main className="max-w-4xl mx-auto px-4 pt-32 md:pt-40 pb-20 md:h-[80vh]">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {user.name}
                </h1>
                <p className="text-muted-foreground text-sm">{user.username}</p>
              </div>
              {isOwner && (
                <div className="sm:ml-auto flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/user/${usernameParam}/settings`}>
                      <LuPencil className="w-3.5 h-3.5" />
                      Edit profile
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            {user.bio && (
              <p className="text-foreground text-sm leading-relaxed">
                {user.bio}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user.location && (
                <span className="flex items-center gap-1">
                  <LuMapPin className="w-3.5 h-3.5" />
                  {user.location}
                </span>
              )}
              {user.website && (
                <span className="flex items-center gap-1">
                  <LuLink className="w-3.5 h-3.5" />
                  {user.website}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-xl bg-card border border-border p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">
              {hostedEvents.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Hosted</p>
          </div>
        </div>

        {/* Events Tabs */}
        {(() => {
          const now = new Date();
          const upcomingEvents = hostedEvents.filter(
            (event) => new Date(event.startsAt) >= now,
          );
          const pastEvents = hostedEvents.filter(
            (event) => new Date(event.startsAt) < now,
          );

          return (
            <Tabs defaultValue="hosted" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="hosted" className="flex-1">
                  Hosted
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1">
                  Past
                </TabsTrigger>
              </TabsList>
              <TabsContent value="hosted" className="space-y-3 mt-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No upcoming events
                  </p>
                ) : (
                  upcomingEvents.map((event) => {
                    const formattedDate = formatDate(event.startsAt);

                    return (
                      <Link
                        key={`event-${event.id}`}
                        href={`/events/${event.id}`}
                        className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:bg-secondary/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {event.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <LuCalendar className="w-3 h-3" />
                            {formattedDate}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <LuUsers className="w-3 h-3" />
                          {event.guestCount}
                        </span>
                      </Link>
                    );
                  })
                )}
              </TabsContent>
              <TabsContent value="past" className="space-y-3 mt-4">
                {pastEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No past events
                  </p>
                ) : (
                  pastEvents.map((event) => {
                    const formattedDate = formatDate(event.startsAt);

                    return (
                      <Link
                        key={`event-${event.id}`}
                        href={`/events/${event.id}`}
                        className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:bg-secondary/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {event.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <LuCalendar className="w-3 h-3" />
                            {formattedDate}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <LuUsers className="w-3 h-3" />
                          {event.guestCount}
                        </span>
                      </Link>
                    );
                  })
                )}
              </TabsContent>
            </Tabs>
          );
        })()}
      </div>
    </main>
  );
};

export default Profile;
