import { LuArrowRight, LuSparkles } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from './components/ui/button';

export default async function Home() {
  return (
    <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 h-screen md:h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <LuSparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-900">
              The easiest way to create events
            </span>
          </div>

          <h1 className="text-2xl mb-6 font-display md:text-5xl font-bold text-primary leading-tight">
            Discover, create, and attend <br />{' '}
            <span className="bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              unforgettable
            </span>{' '}
            events!
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            RSVPin is the platform where communities thrive. Host events,
            connect, and grow your community — all in one place!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group" asChild>
              <Link href="/events/create">
                <span>Create your first Event</span>
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
