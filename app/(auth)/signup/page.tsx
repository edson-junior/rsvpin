import Link from 'next/link';
import { inputClass, labelClass } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { LuArrowRight } from 'react-icons/lu';

export default async function SignUp() {
  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 md:pt-40 pb-20 md:h-[80vh]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">
          Join the community! 🚀
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm text-center">
          Create an account to host events, RSVP to gatherings, and be part of
          something amazing.
        </p>

        <form className="w-full max-w-sm">
          <label className={labelClass}>
            Name
            <input
              type="text"
              placeholder="Your name"
              className={inputClass}
              maxLength={100}
              required
            />
          </label>
          <label className={labelClass}>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </label>
          <label className={labelClass}>
            Password
            <input
              type="password"
              placeholder="At least 6 characters"
              className={inputClass}
              required
            />
          </label>

          <Button className="group w-full">
            <span>Sign up</span>
            <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <p className="text-muted-foreground text-sm border-t border-border pt-8 mt-8 text-center">
          Already have an account?{' '}
          <Link href="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
