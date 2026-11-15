'use client';

// The early access form. Rendered only when lib/early-access.ts has somewhere
// to keep the address (EARLY_ACCESS_OPEN), so it never asks for an email the
// site cannot store. Copy rule: Thoughtstead is a paid app and is not open yet.
// Nothing here may say or imply free, trial, or available now.

import { useEffect, useRef, useState, type FormEvent } from 'react';

type State = 'idle' | 'sending' | 'done' | 'error';

export function EarlyAccessForm({
  placement,
  id,
  tone = 'light',
}: {
  /** Where on the page this form sits; stored with the signup. */
  placement: string;
  id?: string;
  /** 'dark' for the closing panel, which sits on a dark ground. */
  tone?: 'light' | 'dark';
}) {
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  // Set once the form is on screen; the route rejects instant submits.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const data = new FormData(event.currentTarget);
    setState('sending');
    setMessage('');
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          website: data.get('website'),
          startedAt: startedAt.current,
          placement,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        setState('done');
        return;
      }
      setState('error');
      setMessage(json.error || 'That did not go through. Please try again in a moment.');
    } catch {
      setState('error');
      setMessage('That did not go through. Check your connection and try again.');
    }
  }

  const toneClass = tone === 'dark' ? 'early-access-dark' : '';

  if (state === 'done') {
    return (
      <div id={id} className={`early-access ${toneClass}`} data-testid="early-access-done">
        <p className="early-access-done" role="status">
          You&rsquo;re on the list. We&rsquo;ll email you when Thoughtstead opens.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      className={`early-access ${toneClass}`}
      onSubmit={onSubmit}
      data-testid="early-access-form"
    >
      <div className="early-access-row">
        <label className="sr-only" htmlFor={`${placement}-email`}>
          Email address
        </label>
        <input
          id={`${placement}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className="early-access-input"
          disabled={state === 'sending'}
        />
        <button
          type="submit"
          className="hosted-cta hosted-cta-large hosted-cta-live"
          disabled={state === 'sending'}
        >
          {state === 'sending' ? 'Joining…' : 'Get early access'}
        </button>
      </div>
      {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
      <div className="early-access-trap" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className={`early-access-note ${state === 'error' ? 'early-access-error' : ''}`} role={state === 'error' ? 'alert' : undefined}>
        {state === 'error'
          ? message
          : 'Paid app, launching soon. One email when it opens, nothing else.'}
      </p>
    </form>
  );
}
