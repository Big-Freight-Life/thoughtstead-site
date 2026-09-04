import { expect, test } from '@playwright/test';
import {
  evaluateStrategy,
  truePositiveRange,
  type StrategyInputs,
} from '../lib/value-matrix/counts';
import { verdict } from '../lib/value-matrix/value';

// The playable band runs a PORT of system-1's `src/backend/value-matrix/
// counts.ts`. A port can drift from its source, and the drift that would matter
// is not cosmetic — it is the engine quietly starting to clamp impossible input
// instead of refusing it, which is the single behaviour the whole band argues
// from.
//
// So this file has two halves. The first calls the ported functions directly
// (Playwright compiles TypeScript, so a spec can be a unit test) and pins the
// invariants. The second checks that the marketing band names those real
// behaviors without pretending the static card treatment is the product.

test.describe('the ported engine', () => {
  // Every cell derived, nothing typed in, and the four always partition the
  // population exactly.
  test('the four cells always sum to the population', () => {
    const inputs: StrategyInputs = {
      population: 10_000,
      actualPositives: 400,
      alerts: 500,
      truePositives: 280,
    };
    const result = evaluateStrategy(inputs);
    expect(result.valid).toBe(true);
    if (!result.valid) return;
    const { truePositive, falsePositive, falseNegative, trueNegative } = result.counts;
    expect(truePositive + falsePositive + falseNegative + trueNegative).toBe(inputs.population);
    expect(falsePositive).toBe(inputs.alerts - inputs.truePositives);
    expect(falseNegative).toBe(inputs.actualPositives - inputs.truePositives);
  });

  // THE ONE THAT MATTERS. The V1 parser clamped out-of-range input back into
  // range, so the matrix you exported was not the one you entered. There is no
  // clamp now: invalid input yields violations and NO counts, and the union
  // type is what makes that unforgettable.
  test('impossible input is refused, never clamped', () => {
    const result = evaluateStrategy({
      population: 10_000,
      actualPositives: 2_000,
      alerts: 50,
      truePositives: 2_000,
    });
    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result).not.toHaveProperty('counts');
    expect(result.violations.map((v) => v.code)).toContain('true_positives_exceed_alerts');
    // The message names the numbers in conflict, not just the rule.
    expect(result.violations[0].message).toMatch(/2,000 times out of 50 alerts/);
    expect(result.violations[0].fields).toEqual(['truePositives', 'alerts']);
  });

  // The lower bound is the half people get wrong, and it is unreachable from
  // the page's slider ranges — so without this it would have no coverage.
  // Flag 90 of 100 when 30 are genuinely positive and at least 20 alerts MUST
  // be right: there are only 10 negatives to spend false alarms on.
  test('the minimum-true-positive rule holds', () => {
    const inputs: StrategyInputs = {
      population: 100,
      actualPositives: 30,
      alerts: 90,
      truePositives: 5,
    };
    expect(truePositiveRange(inputs)).toEqual({ min: 20, max: 30 });

    const result = evaluateStrategy(inputs);
    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.violations.map((v) => v.code)).toContain('true_positives_below_minimum');

    // And 20 is legal, so the bound is exact rather than merely restrictive.
    expect(evaluateStrategy({ ...inputs, truePositives: 20 }).valid).toBe(true);
  });

  // The break-even refuses where the two options do not differ in the cell
  // being varied, rather than inventing a figure that separates them.
  test('there is no break-even when there are no false alarms', () => {
    const perfect = evaluateStrategy({
      population: 1_000,
      actualPositives: 100,
      alerts: 100,
      truePositives: 100,
    });
    expect(perfect.valid).toBe(true);
    if (!perfect.valid) return;
    const money = { perCatch: 100, perFalseAlarm: 10, perMiss: 500 };
    expect(verdict(perfect.counts, money).breakEvenFalseAlarm).toBeNull();

    // With false alarms present it is a real number, and at exactly that
    // false-alarm cost shipping and not shipping are worth the same.
    const mixed = evaluateStrategy({
      population: 1_000,
      actualPositives: 100,
      alerts: 200,
      truePositives: 80,
    });
    expect(mixed.valid).toBe(true);
    if (!mixed.valid) return;
    const be = verdict(mixed.counts, money).breakEvenFalseAlarm;
    expect(be).not.toBeNull();
    const atBreakEven = verdict(mixed.counts, { ...money, perFalseAlarm: be as number });
    expect(atBreakEven.delta).toBeCloseTo(0, 6);
  });
});

test.describe('the Value Matrix cards on the page', () => {
  test('names the four product behaviors without rendering the retired calculator', async ({ page }) => {
    await page.goto('/');
    const cards = page.getByTestId('value-matrix-cards');
    await expect(cards).toBeVisible();
    await expect(cards.locator('article')).toHaveCount(4);
    await expect(cards).toContainText('Four outcomes');
    await expect(cards).toContainText('Impossible means impossible');
    await expect(cards).toContainText('The break-even point');
    await expect(cards).toContainText('A human baseline');
    await expect(page.getByTestId('value-matrix-demo')).toHaveCount(0);
  });

  test('the line icons animate, with a static reduced-motion treatment', async ({ page }) => {
    await page.goto('/');
    const movingPart = page.locator('.matrix-icon-outcomes i').first();
    await expect(movingPart).toBeAttached();
    expect(await movingPart.evaluate((node) => getComputedStyle(node).animationName)).not.toBe('none');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await movingPart.evaluate((node) => getComputedStyle(node).animationName)).toBe('none');
  });
});
