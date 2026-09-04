// The Value Matrix count engine — a narrow, faithful port.
//
// SOURCE: system-1 `src/backend/value-matrix/counts.ts`. That module is pure by
// design ("all pure so the surface recomputes in the browser"), which is the
// only reason this page can run the product's real arithmetic rather than a
// mock of it. Carried across: `truePositiveRange`, `validateStrategyInputs`,
// `deriveCounts`, `deriveMetrics`, `evaluateStrategy`,
// `nearestValidTruePositives`, `formatMetric`. The types they need are inlined
// below rather than dragging in a 981-line `types.ts`.
//
// WHAT IS NOT PORTED: impacts (unit canonicalisation), forecast, sensitivity,
// decision, reframe. The marketing demo needs the partition and one break-even,
// not the whole tool.
//
// DRIFT: this is a copy, and a copy can diverge. Two things hold it: the port
// is one file, and `e2e/value-matrix.spec.ts` asserts the two behaviours that
// matter most — the minimum-TP rule, and that invalid input yields NO counts
// rather than clamped ones. If the source changes, those are what to re-check.

/** The four inputs of a strategy, as the shape the arithmetic takes. */
export type StrategyInputs = {
  population: number;
  actualPositives: number;
  alerts: number;
  truePositives: number;
};

export type DerivedCounts = {
  truePositive: number;
  falsePositive: number;
  falseNegative: number;
  trueNegative: number;
};

export type DerivedMetrics = {
  prevalence: number | null;
  alertRate: number | null;
  precision: number | null;
  recall: number | null;
  specificity: number | null;
  accuracy: number | null;
};

export type CountViolation = {
  code: string;
  message: string;
  fields: string[];
};

export type StrategyEvaluation =
  | { valid: true; counts: DerivedCounts; metrics: DerivedMetrics }
  | { valid: false; violations: CountViolation[] };

// The partition.
//
// Four cells describe one evaluated population, and they are DERIVED — never
// typed in, never stored:
//
//   TP = truePositives
//   FP = alerts - TP                    flagged, but nothing was there
//   FN = actualPositives - TP           there, but not flagged
//   TN = population - TP - FP - FN      everything else
//
// and TP + FP + FN + TN = population, always, by construction.
//
// THERE IS NO CLAMP, deliberately. Silently correcting somebody's arithmetic is
// worse than refusing it: they never learn the number was impossible, and the
// matrix they exported is not the one they entered. Invalid inputs are REJECTED
// with the offending fields named, and no counts are produced at all.

/**
 * The window TP has to sit in for the other three cells to be non-negative.
 *
 * The lower bound is the interesting half and the one people get wrong. If the
 * system flags 90 of 100 items and 30 are genuinely positive, at least 20 of
 * those flags MUST be right — there are only 10 negatives to spend false alarms
 * on.
 */
export function truePositiveRange(inputs: StrategyInputs): { min: number; max: number } {
  const { population, actualPositives, alerts } = inputs;
  return {
    min: Math.max(0, alerts + actualPositives - population),
    max: Math.min(alerts, actualPositives),
  };
}

function isWholeNumber(n: number): boolean {
  return Number.isFinite(n) && Number.isInteger(n);
}

/**
 * Why these four numbers cannot describe a real evaluation.
 *
 * Every violation names the FIELDS in conflict, not just the rule — "check your
 * inputs" sends someone to re-read four boxes; naming the number to move tells
 * them which one and why.
 */
export function validateStrategyInputs(inputs: StrategyInputs): CountViolation[] {
  const { population, actualPositives, alerts, truePositives } = inputs;
  const violations: CountViolation[] = [];

  const nonInteger = (
    [
      ['population', population],
      ['actualPositives', actualPositives],
      ['alerts', alerts],
      ['truePositives', truePositives],
    ] as const
  ).filter(([, v]) => !isWholeNumber(v));
  if (nonInteger.length > 0) {
    violations.push({
      code: 'non_integer',
      message: 'Counts must be whole numbers — you cannot evaluate half a case.',
      fields: nonInteger.map(([k]) => k),
    });
    // Every rule below compares these against each other, and a NaN compares
    // false both ways — which would report the number as valid.
    return violations;
  }

  if (population < 0) {
    violations.push({
      code: 'population_negative',
      message: 'The evaluated population cannot be negative.',
      fields: ['population'],
    });
    return violations;
  }

  if (alerts < 0 || alerts > population) {
    violations.push({
      code: 'alerts_exceed_population',
      message: `The system cannot flag ${alerts.toLocaleString('en-US')} of ${population.toLocaleString('en-US')} evaluated cases.`,
      fields: ['alerts', 'population'],
    });
  }

  if (actualPositives < 0 || actualPositives > population) {
    violations.push({
      code: 'actual_positives_exceed_population',
      message: `There cannot be ${actualPositives.toLocaleString('en-US')} positive cases in a population of ${population.toLocaleString('en-US')}.`,
      fields: ['actualPositives', 'population'],
    });
  }

  // The TP bounds are only meaningful once the two totals are themselves legal.
  if (violations.length > 0) return violations;

  if (truePositives < 0 || truePositives > alerts) {
    violations.push({
      code: 'true_positives_exceed_alerts',
      message: `The system cannot be right ${truePositives.toLocaleString('en-US')} times out of ${alerts.toLocaleString('en-US')} alerts. True positives cannot exceed alerts.`,
      fields: ['truePositives', 'alerts'],
    });
  }

  if (truePositives > actualPositives) {
    violations.push({
      code: 'true_positives_exceed_actual_positives',
      message: `The system cannot catch ${truePositives.toLocaleString('en-US')} problems when only ${actualPositives.toLocaleString('en-US')} exist.`,
      fields: ['truePositives', 'actualPositives'],
    });
  }

  const { min } = truePositiveRange(inputs);
  if (truePositives < min) {
    const negatives = population - actualPositives;
    violations.push({
      code: 'true_positives_below_minimum',
      message: `At least ${min.toLocaleString('en-US')} alerts must be correct: there are only ${negatives.toLocaleString('en-US')} negative cases to raise false alarms on, and the system raised ${alerts.toLocaleString('en-US')} alerts.`,
      fields: ['truePositives', 'alerts', 'actualPositives', 'population'],
    });
  }

  return violations;
}

/** The four cells. Only ever called behind a passing validation. */
export function deriveCounts(inputs: StrategyInputs): DerivedCounts {
  const { population, actualPositives, alerts, truePositives } = inputs;
  const falsePositive = alerts - truePositives;
  const falseNegative = actualPositives - truePositives;
  return {
    truePositive: truePositives,
    falsePositive,
    falseNegative,
    trueNegative: population - truePositives - falsePositive - falseNegative,
  };
}

/** A ratio, or null when its denominator is zero and the answer is undefined. */
function ratio(numerator: number, denominator: number): number | null {
  return denominator > 0 ? numerator / denominator : null;
}

export function deriveMetrics(counts: DerivedCounts, population: number): DerivedMetrics {
  const { truePositive: tp, falsePositive: fp, falseNegative: fn, trueNegative: tn } = counts;
  return {
    prevalence: ratio(tp + fn, population),
    alertRate: ratio(tp + fp, population),
    precision: ratio(tp, tp + fp),
    recall: ratio(tp, tp + fn),
    specificity: ratio(tn, tn + fp),
    accuracy: ratio(tp + tn, population),
  };
}

/**
 * The single entry point. Valid inputs carry counts and metrics; invalid ones
 * carry reasons and nothing else.
 *
 * The union is the guard: there is no way to reach `.counts` on an evaluation
 * that failed, so a negative cell cannot reach a value calculation by anyone
 * forgetting to check first.
 */
export function evaluateStrategy(inputs: StrategyInputs): StrategyEvaluation {
  const violations = validateStrategyInputs(inputs);
  if (violations.length > 0) return { valid: false, violations };
  const counts = deriveCounts(inputs);
  return { valid: true, counts, metrics: deriveMetrics(counts, inputs.population) };
}

/**
 * The nearest legal value for TP, for the "fix this for me" affordance.
 *
 * Offered as a SUGGESTION the person applies, never applied automatically —
 * that distinction is the whole reason there is no clamp.
 */
export function nearestValidTruePositives(inputs: StrategyInputs): number | null {
  const { population, actualPositives, alerts } = inputs;
  if (!isWholeNumber(population) || population < 0) return null;
  if (alerts < 0 || alerts > population) return null;
  if (actualPositives < 0 || actualPositives > population) return null;
  const { min, max } = truePositiveRange(inputs);
  return Math.min(max, Math.max(min, Math.round(inputs.truePositives)));
}

/** A metric as a percentage, or an em dash when it is undefined. */
export function formatMetric(v: number | null): string {
  return v === null ? '—' : `${(v * 100).toFixed(1)}%`;
}
