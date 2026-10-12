'use client';

import { useActionState } from 'react';
import { AlertCircle, Loader, LogIn } from 'lucide-react';
import { loginAction } from '@/app/admin/actions';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-body mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={Boolean(state?.error)}
          aria-describedby={state?.error ? 'login-error' : undefined}
          className="w-full rounded-lg border border-line bg-page px-4 py-3 text-heading focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      {state?.error && (
        <p id="login-error" role="alert" className="flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-semibold text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
      >
        {pending ? <Loader className="h-4 w-4 animate-spin" aria-hidden /> : <LogIn className="h-4 w-4" aria-hidden />}
        Sign in
      </button>
    </form>
  );
}
