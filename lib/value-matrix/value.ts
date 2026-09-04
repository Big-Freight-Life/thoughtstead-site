// What the four cells are worth, and the one number worth arguing about.
//
// The product's own framing, from system-1 `src/backend/value-matrix/
// sensitivity.ts`:
//
//   "The break-even figure is the one worth arguing about in a meeting, because
//    it is the assumption the decision rests on: 'conservative wins the moment a
//    false alarm costs more than $340' is a claim somebody in the room can
//    confirm or refute, while 'the net is $412,000' is a number nobody can
//    check."
//
// The real tool solves that equation over any impact in any unit, against any
// two strategies. This page solves it in one unit (money) against one
// alternative (ship nothing), which is the comparison a visitor can hold in
// their head. Everything else about it is the same idea.
//
// The rule the full engine exists to enforce and this port keeps: it REFUSES
// where the two strategies do not differ in the cell being varied, because
// there is then no value that separates them and any number returned would be
// an invention.

import type { DerivedCounts } from './counts';

export type Money = {
  /** What catching one is worth. */
  perCatch: number;
  /** What one false alarm costs — the number under the whole argument. */
  perFalseAlarm: number;
  /** What one miss costs. */
  perMiss: number;
};

export type Verdict = {
  /** Net value of shipping the system. */
  net: number;
  /** Net value of shipping nothing: every real case is a miss. */
  netDoingNothing: number;
  /** How much better (or worse) shipping is. */
  delta: number;
  /**
   * The false-alarm cost at which shipping and not shipping are worth exactly
   * the same. Null when there are no false alarms to vary — with FP at zero the
   * two strategies do not differ in that cell, and any figure would be invented.
   */
  breakEvenFalseAlarm: number | null;
};

export function verdict(counts: DerivedCounts, money: Money): Verdict {
  const { truePositive: tp, falsePositive: fp, falseNegative: fn } = counts;

  const net = tp * money.perCatch - fp * money.perFalseAlarm - fn * money.perMiss;
  // Ship nothing and every real case goes uncaught.
  const netDoingNothing = -(tp + fn) * money.perMiss;

  // net === netDoingNothing  =>  fp * C = tp * (perCatch + perMiss)
  const breakEvenFalseAlarm =
    fp > 0 ? (tp * (money.perCatch + money.perMiss)) / fp : null;

  return { net, netDoingNothing, delta: net - netDoingNothing, breakEvenFalseAlarm };
}

/** Whole dollars, with a sign that reads as a sign rather than a minus glyph. */
export function money(n: number): string {
  const rounded = Math.round(n);
  const body = Math.abs(rounded).toLocaleString('en-US', { maximumFractionDigits: 0 });
  return rounded < 0 ? `−$${body}` : `$${body}`;
}
