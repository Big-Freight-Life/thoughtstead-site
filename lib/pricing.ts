// The advertised price, in one place with no JSX in it.
//
// It lives here rather than in components/cta.tsx so that things which are not
// React can read it — specifically e2e/smoke.spec.ts, whose price-contradiction
// test previously hardcoded "$20" and therefore had to be hand-edited every
// time the price moved. A guard that needs editing when the thing it guards
// changes is not a guard.
//
// MIRRORS system-1 `src/backend/billing/plan.ts`, which is authoritative — and
// which is itself only describing the product record in Polar. This site cannot
// import across repos, so these are copies and `plan.ts` is what to check them
// against. Two things it says that this site must not contradict: the plan is
// named Individual, and THERE IS NO TRIAL.

export const PLAN_NAME = 'Individual';

export const HOSTED_PRICE = '$19.99';
export const HOSTED_PERIOD = 'month';
export const ANNUAL_PRICE = '$199.99';
export const ANNUAL_PERIOD = 'year';

// Minor units, so the saving below is a fact about these two figures rather
// than a marketing claim that drifts away from them the first time one moves.
const MONTHLY_CENTS = 1999;
const ANNUAL_CENTS = 19999;

/** How much annual saves against paying monthly for a year, to a whole percent. */
export const ANNUAL_SAVING_PERCENT = Math.round(
  ((MONTHLY_CENTS * 12 - ANNUAL_CENTS) / (MONTHLY_CENTS * 12)) * 100,
);

/** Every figure the site is allowed to quote as a price. */
export const ADVERTISED_PRICES: readonly string[] = [HOSTED_PRICE, ANNUAL_PRICE];
