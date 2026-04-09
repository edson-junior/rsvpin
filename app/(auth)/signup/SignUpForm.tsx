'use client';

import { useActionState } from 'react';
import { signUp } from './actions';
import { LuArrowRight } from 'react-icons/lu';
import { Button } from '../../components/ui/button';
import { inputClass, labelClass } from '../../components/ui/input';

type Props = {
  returnTo: string | string[] | undefined;
};

export default function SignUpForm({ returnTo }: Props) {
  const signUpWithReturnTo = signUp.bind(null, returnTo);
  const [state, formAction, pending] = useActionState(signUpWithReturnTo, {});

  return (
    <form action={formAction} className="w-full max-w-sm">
      <label className={labelClass}>
        Name
        <input
          name="name"
          placeholder="Your name"
          className={inputClass}
          maxLength={100}
          required
        />
        {state.errors?.name && (
          <p className="text-red-500 text-sm mt-2">{state.errors.name}</p>
        )}
      </label>
      <label className={labelClass}>
        Email
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
        Username
        <input
          name="username"
          placeholder="Choose a username"
          className={inputClass}
          maxLength={100}
          required
        />
        {state.errors?.username && (
          <p className="text-red-500 text-sm mt-2">{state.errors.username}</p>
        )}
      </label>
      <label className={labelClass}>
        Password
        <input
          type="password"
          name="password"
          placeholder="At least 6 characters"
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
        <span>{pending ? 'Signing up...' : 'Sign up'}</span>
        <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
