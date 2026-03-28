import { LuCalendar, LuLink, LuMapPin, LuUsers } from 'react-icons/lu';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { mockEvents, mockUsers } from '@/mocks/mockData';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

const mockUser = mockUsers[0];

const Profile = () => {
  if (!mockUser) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pt-32 md:pt-40 pb-20 md:h-[80vh]">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {mockUser.name}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {mockUser.username}
                </p>
              </div>
              <div className="sm:ml-auto flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/user/${mockUser.username}/settings`}>
                    Edit profile
                  </Link>
                </Button>
              </div>
            </div>
            <p className="text-foreground text-sm leading-relaxed">
              {mockUser.bio}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <LuMapPin className="w-3.5 h-3.5" />
                {mockUser.location}
              </span>
              <span className="flex items-center gap-1">
                <LuLink className="w-3.5 h-3.5" />
                {mockUser.website}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Hosted', value: mockUser.eventsHosted },
            { label: 'Attended', value: mockUser.eventsAttended },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-card border border-border p-4 text-center"
            >
              <p className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Events Tabs */}
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
            {mockEvents.map((event) => {
              const formattedDate = formatDate(event.date);

              return (
                <Link
                  key={event.id}
                  href={`/event/${event.id}`}
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
                    {event.guests.length}
                  </span>
                </Link>
              );
            })}
          </TabsContent>
          <TabsContent value="attending" className="mt-4">
            <p className="text-sm text-muted-foreground text-center py-8">
              No upcoming events
            </p>
          </TabsContent>
          <TabsContent value="past" className="mt-4">
            <p className="text-sm text-muted-foreground text-center py-8">
              No past events
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Profile;
