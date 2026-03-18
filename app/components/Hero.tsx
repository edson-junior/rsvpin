import { LuArrowRight, LuSparkles } from 'react-icons/lu';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
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

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            RSVPin is the platform where communities thrive. Host events, sell
            tickets, and grow your community — all in one place!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group">
              <span>Create your first Event</span>
              <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
