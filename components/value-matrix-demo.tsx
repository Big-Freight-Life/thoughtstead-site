'use client';

import { useMemo, useState } from 'react';
import {
  evaluateStrategy,
  formatMetric,
  nearestValidTruePositives,
  type StrategyInputs,
} from '@/lib/value-matrix/counts';
import { money, verdict } from '@/lib/value-matrix/value';

// The Value Matrix, playable.
//
// This band runs the PRODUCT'S OWN ARITHMETIC — `lib/value-matrix/counts.ts` is
// a faithful port of system-1's engine, which is pure precisely so it can
// recompute in a browser. Nothing here is mocked, and nothing here is rounded
// into looking better than it is.
//
// The simplification, stated on the page rather than hidden: the real tool
// takes the four counts directly. Three rate sliders are an easier way in, and
// they derive those counts.
//
// The refusal is a FEATURE, not an edge case. Drag the catch rate above what
// the alert rate can support and the engine says so, names the numbers in
// conflict, and produces no matrix at all. Every competitor in this category
// would clamp the input and show you a chart. That difference is the entire
// argument, so it is on the page rather than in a footnote.

const POPULATION = 10_000;

type Rate = { key: string; label: string; hint: string; min: number; max: number; step: number };

const RATES: Rate[] = [
  {
    key: 'prevalence',
    label: 'How common the problem actually is',
    hint: 'of everything the model looks at',
    min: 0.5,
    max: 20,
    step: 0.5,
  },
  {
    key: 'catchRate',
    label: 'How much of it the model catches',
    hint: 'of the cases that are genuinely there',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    key: 'alertRate',
    label: 'How often the model fires',
    hint: 'of everything it looks at',
    min: 0.5,
    max: 30,
    step: 0.5,
  },
];

const COSTS = [
  { key: 'perCatch', label: 'A catch is worth', min: 0, max: 1000, step: 10 },
  { key: 'perFalseAlarm', label: 'A false alarm costs', min: 0, max: 500, step: 5 },
  { key: 'perMiss', label: 'A miss costs', min: 0, max: 3000, step: 25 },
] as const;

function Slider({
  id,
  label,
  hint,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="py-3.5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.9rem] leading-snug">
          {label}
        </label>
        <output htmlFor={id} className="shrink-0 font-medium tabular-nums text-accent">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="vm-range mt-2.5 w-full"
      />
      {hint && <p className="mt-1 text-xs text-faint">{hint}</p>}
    </div>
  );
}

// Prediction down the ROWS, actual outcome across the COLUMNS, TP FP over
// FN TN — the arrangement the product settled on 2026-09-01. Correct-vs-error
// is per cell: the word, plus a solid or dashed left rule.
const CELLS = [
  { key: 'truePositive', row: 'Flagged it', col: 'Actually there', kind: 'Correct', correct: true },
  { key: 'falsePositive', row: 'Flagged it', col: 'Nothing there', kind: 'False alarm', correct: false },
  { key: 'falseNegative', row: 'Let it through', col: 'Actually there', kind: 'Miss', correct: false },
  { key: 'trueNegative', row: 'Let it through', col: 'Nothing there', kind: 'Correct', correct: true },
] as const;

export function ValueMatrixDemo() {
  const [prevalence, setPrevalence] = useState(4);
  const [catchRate, setCatchRate] = useState(70);
  const [alertRate, setAlertRate] = useState(5);
  const [perCatch, setPerCatch] = useState(250);
  const [perFalseAlarm, setPerFalseAlarm] = useState(40);
  const [perMiss, setPerMiss] = useState(900);

  const inputs: StrategyInputs = useMemo(() => {
    const actualPositives = Math.round(POPULATION * (prevalence / 100));
    return {
      population: POPULATION,
      actualPositives,
      alerts: Math.round(POPULATION * (alertRate / 100)),
      truePositives: Math.round(actualPositives * (catchRate / 100)),
    };
  }, [prevalence, alertRate, catchRate]);

  const result = useMemo(() => evaluateStrategy(inputs), [inputs]);

  const decision = useMemo(
    () =>
      result.valid
        ? verdict(result.counts, { perCatch, perFalseAlarm, perMiss })
        : null,
    [result, perCatch, perFalseAlarm, perMiss],
  );

  // The "fix this for me" affordance, expressed back through the slider the
  // visitor is actually holding. Offered, never applied on their behalf.
  function snapToPossible() {
    const nearest = nearestValidTruePositives(inputs);
    if (nearest === null || inputs.actualPositives === 0) return;

    // FLOOR, then step down until the derived count actually lands inside the
    // legal window — not round.
    //
    // The slider carries a rate and the engine wants a count, and the two are
    // bridged by a rounding step in each direction. Rounding here rounds UP:
    // with 2,000 genuinely positive and only 50 alerts, the nearest legal TP is
    // 50, and round(50/2000 x 100) is 3% — which derives back to 60, still
    // above the 50 it was supposed to fix. The button did nothing, and the e2e
    // recovery test is what caught it.
    let rate = Math.floor((nearest / inputs.actualPositives) * 100);
    while (rate > 0 && Math.round(inputs.actualPositives * (rate / 100)) > nearest) rate -= 1;
    setCatchRate(rate);
  }

  const setCost = {
    perCatch: setPerCatch,
    perFalseAlarm: setPerFalseAlarm,
    perMiss: setPerMiss,
  } as const;
  const costValue = { perCatch, perFalseAlarm, perMiss } as const;
  const rateValue: Record<string, number> = { prevalence, catchRate, alertRate };
  const setRate: Record<string, (n: number) => void> = {
    prevalence: setPrevalence,
    catchRate: setCatchRate,
    alertRate: setAlertRate,
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12" data-testid="value-matrix-demo">
      {/* ── The dials ─────────────────────────────────────────────────── */}
      <div className="frame p-7 md:p-8 lg:col-span-5">
        <p className="text-sm leading-relaxed text-muted">
          Ten thousand cases go past it. Move the three things nobody writes down.
        </p>

        <div className="mt-4 divide-y divide-line">
          {RATES.map((r) => (
            <Slider
              key={r.key}
              id={`vm-${r.key}`}
              label={r.label}
              hint={r.hint}
              value={rateValue[r.key]}
              display={`${rateValue[r.key]}%`}
              min={r.min}
              max={r.max}
              step={r.step}
              onChange={setRate[r.key]}
            />
          ))}
        </div>

        <div className="mt-8 divide-y divide-line">
          {COSTS.map((c) => (
            <Slider
              key={c.key}
              id={`vm-${c.key}`}
              label={c.label}
              value={costValue[c.key]}
              display={money(costValue[c.key])}
              min={c.min}
              max={c.max}
              step={c.step}
              onChange={setCost[c.key]}
            />
          ))}
        </div>
      </div>

      {/* ── The answer ────────────────────────────────────────────────── */}
      <div className="lg:col-span-7">
        {result.valid ? (
          <>
            <div className="frame overflow-hidden p-7 md:p-8">
              <div className="flex flex-wrap items-baseline justify-end gap-x-6 gap-y-2">
                <p className="text-xs text-faint">
                  {POPULATION.toLocaleString('en-US')} cases &middot;{' '}
                  {inputs.actualPositives.toLocaleString('en-US')} genuinely there &middot;{' '}
                  {inputs.alerts.toLocaleString('en-US')} flagged
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {CELLS.map((cell) => (
                  <div
                    key={cell.key}
                    data-cell={cell.key}
                    className={`rounded-lg bg-surface-2/70 py-4 pl-4 pr-3 ${
                      cell.correct
                        ? 'border-l-2 border-solid border-accent'
                        : 'border-l-2 border-dashed border-line-2'
                    }`}
                  >
                    <p className="text-xs text-faint">
                      {cell.row} &middot; {cell.col}
                    </p>
                    <p className="display mt-1.5 text-3xl tabular-nums md:text-4xl">
                      {result.counts[cell.key].toLocaleString('en-US')}
                    </p>
                    <p
                      className={`mt-1 text-xs ${cell.correct ? 'text-accent' : 'text-muted'}`}
                    >
                      {cell.kind}
                    </p>
                  </div>
                ))}
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
                {(
                  [
                    ['Precision', result.metrics.precision],
                    ['Recall', result.metrics.recall],
                    ['Accuracy', result.metrics.accuracy],
                  ] as const
                ).map(([label, v]) => (
                  <div key={label}>
                    <dt className="text-xs text-faint">{label}</dt>
                    <dd className="mt-0.5 tabular-nums">{formatMetric(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {decision && (
              <div className="mt-6 border border-accent bg-accent-soft p-7 md:p-8">
                <p className="display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.12]">
                  {decision.delta >= 0 ? 'Ship it. It beats' : 'Do not ship it. It loses to'}{' '}
                  <span className="quote">doing nothing</span> by{' '}
                  <span className="tabular-nums">{money(Math.abs(decision.delta))}</span>.
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                  {decision.breakEvenFalseAlarm === null ? (
                    <>
                      No false alarms at this setting, so there is nothing to break even
                      against — and a break-even figure invented from a cell where the two
                      options do not differ would be exactly the kind of number this tool
                      exists to refuse.
                    </>
                  ) : (
                    <>
                      And here is the sentence to take into the room:{' '}
                      <span className="text-text">
                        this stops being worth shipping the moment one false alarm costs more
                        than{' '}
                        <span className="tabular-nums">
                          {money(decision.breakEvenFalseAlarm)}
                        </span>
                      </span>
                      . Somebody in the room can confirm or refute that. Nobody can check a
                      net of {money(decision.net)} — which is why the argument belongs on the
                      assumption and not on the total.
                    </>
                  )}
                </p>
              </div>
            )}
          </>
        ) : (
          // The refusal. The product's real messages, verbatim from the engine.
          <div className="frame p-7 md:p-8" data-testid="vm-refusal">
            <ul className="space-y-4">
              {result.violations.map((v) => (
                <li key={v.code} className="flex gap-4">
                  <span
                    className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent"
                    aria-hidden="true"
                  />
                  <p className="text-[0.95rem] leading-relaxed">{v.message}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              Every other tool would quietly pull that number back into range and draw you a
              chart. Then the matrix you exported is not the one you entered, and you never
              learn the claim was impossible. This one refuses, and names the numbers in
              conflict.
            </p>
            <button
              type="button"
              onClick={snapToPossible}
              // min-h-11 is 44px — see the note in concept-switch.tsx.
              className="mt-6 min-h-11 border border-line-2 bg-bg px-5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Use the nearest number that is possible
            </button>
          </div>
        )}

        <p className="mt-5 text-xs leading-relaxed text-faint">
          This runs Thoughtstead&rsquo;s own engine, not a demo of it — the same functions,
          the same refusals. The one simplification: the real tool takes the four counts
          directly, and these three sliders derive them for you.
        </p>
      </div>
    </div>
  );
}
