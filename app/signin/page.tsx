import Link from 'next/link';
import { inputClass, labelClass } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { LuArrowRight } from 'react-icons/lu';

export default async function SignIn() {
  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 md:pt-40 pb-20 md:h-[80vh]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">
          Welcome back! 🎉
        </h1>

        <p className="text-muted-foreground mb-8">
          Sign in to your RSVPin account.
        </p>

        <form className="w-full max-w-sm">
          <label className={labelClass}>
            Email address
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className={inputClass}
            />
          </label>

          <Button className="group w-full">
            <span>Sign in</span>
            <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

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
