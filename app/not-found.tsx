import Link from 'next/link';
import { LuArrowLeft } from 'react-icons/lu';

export default function NotFound() {
  return (
    <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 h-[80vh] flex">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-2xl mb-6 font-display md:text-5xl font-bold text-primary leading-tight">
          Not Found
        </h1>
        <p className="md:text-lg text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto">
          Could not find what you were looking for.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <LuArrowLeft className="w-4 h-4" />
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
