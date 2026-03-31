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
          <span className="text-red-500 text-xs mt-1">{state.errors.name}</span>
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
          <span className="text-red-500 text-xs mt-1">
            {state.errors.email}
          </span>
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
          <span className="text-red-500 text-xs mt-1">
            {state.errors.username}
          </span>
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
          <span className="text-red-500 text-xs mt-1">
            {state.errors.password}
          </span>
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
