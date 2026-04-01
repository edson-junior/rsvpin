'use client';

import { useActionState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { Button } from '../../components/ui/button';
import { inputClass, labelClass } from '../../components/ui/input';
import { signIn } from './actions';

type Props = {
  returnTo: string | string[] | undefined;
};

export default function SignInForm({ returnTo }: Props) {
  const signInWithReturnTo = signIn.bind(null, returnTo);
  const [state, formAction, pending] = useActionState(signInWithReturnTo, {});

  return (
    <form action={formAction} className="w-full max-w-sm">
      <label className={labelClass}>
        Email address
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className={inputClass}
          required
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm mt-2">{state.errors.email}</p>
        )}
      </label>
      <label className={labelClass}>
        Password
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          className={inputClass}
          required
        />
        {state.errors?.password && (
          <p className="text-red-500 text-sm mt-2">{state.errors.password}</p>
        )}
      </label>

      {state.errors?.general && (
        <p className="text-red-500 text-sm mb-4">{state.errors.general}</p>
      )}

      <Button className="group w-full" disabled={pending}>
        <span>{pending ? 'Signing in...' : 'Sign in'}</span>
        <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
