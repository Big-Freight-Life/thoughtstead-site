# Redesign brief — thoughtstead.com marketing site

**Repo:** `/Users/raybutler/development/thoughtstead-site` (Next.js 16.2.10, React
19, Tailwind v4, MDX). It is a sibling of the product repo `system-1` and cannot
import from it.

**Your job: REDESIGN.** The positioning, the audience and the copy were settled
on 2026-09-03 and are not what needs work. The page's *visual design and
structure* are. Treat the copy as raw material you may re-cut, re-order,
compress or re-typeset — but not re-argue. Where a copy change genuinely serves
the design, make it and say so.

---

## 1. What the product is

**Thoughtstead is a life operating system**, sold as a hosted subscription. One
instance, subscribers sign in, one shared database behind row-level security.

**Who it is for: product people building AI features and AI systems.**

**The promise:** every piece of the thing you are building sits in a different
tool, and none of them talk to each other. Thoughtstead holds all of it, works
out how it connects, and does the follow-through — and it does not stop at the
end of the workday.

**The wedge:** Figma gives you a canvas. Linear gives you tickets. Notion gives
you docs. None of them will tell you the feature should not ship.

Three claims, each with real software behind it:

1. **You wire none of it.** Capture is raw-first and never lost; enrichment reads
   it afterwards and links the people, projects, concepts and decisions it
   touches.
2. **It has a method, not just a surface.** Research notes → a positioning brief
   → a concept held two ways at once (a *storyboard* of what a person
   experiences, and a *digital twin* of the typed components behind it, linked
   moment to component) → a **Value Matrix** that answers whether the feature
   should exist, in true/false positives and negatives, against a human
   baseline, with a break-even and a sensitivity curve → an **AI Security**
   contract (what it may touch, what it must never do unattended) → the deck you
   show people → a dashboard for the systems already shipped.
3. **It acts, and shows the receipts.** Agents brief, chase and research;
   anything outbound parks for human approval, enforced in the database rather
   than requested in a prompt.

**Why it is a system and not a tool: contexts.** Each thing you run is its own
world, isolated at the database level — search in one never returns the other.
The product you are building is one context. The company is another. The
household is another.

---

## 2. Positioning rules — non-negotiable

Each of these is a mistake already made on this page. Do not re-make them.

1. **Never "AI second brain."** Worn out, borrowed, and it promises recall alone.
   An e2e test fails on the string across every page.
2. **Never "business OS."** Contested, and it strands the personal surfaces that
   ship.
3. **It IS a life operating system.** Keep the phrase on the page.
4. **Never a self-hosted tier, licence, buyer or waitlist.** There is exactly one
   hosted subscription. An e2e test fails on `/self-host/i` across every page.
5. **Name the audience by SITUATION, never by label.** "The AI feature landed on
   your roadmap" — never "Product Managers", never "solopreneurs".
6. **Never mention Payable / accounts payable.** There is no such route in the
   product. Receivable only.
7. **Never offer a free trial.** The billing products carry none; any such copy
   is a promise the checkout will break. An e2e test enforces this.
8. **The EVIDENCE RULE.** Every concrete claim on the page must correspond to
   something that actually exists in the product. Do not invent a capability to
   make a section balance. If you need a claim and cannot verify one, cut the
   section instead.

---

## 3. The competitive benchmark

Beat **https://my.hellohaven.ai** (Hello Haven — a consumer personal-AI
assistant). Read it before designing. It is a different market; you are matching
and beating its *craft*, not chasing its audience.

**What Haven does better than us today, and what you must close:**

- A full-bleed hero photograph with real presence. Ours is type on a flat dark
  field.
- A warm first-person voice throughout ("I remember everything").
- Three bands of emotional problem-framing before any product appears.
- Four named persona cards.
- Seven testimonials and a founder note with a real personal reason.
- A zero-friction CTA: "Try Haven Now — free during beta, no credit card."

**What Haven is structurally weak at, and where we win:**

- **There is not one screenshot of the product anywhere on their page.** It is a
  mood board with testimonials. Every claim is a feeling.
- A band of AI vendor logos (GPT / Claude / Gemini / Llama, "and more…") that
  reads as *we have no technology of our own*.
- Testimonials attributed to a first name and a city only.
- No pricing on the page at all.

**The strategy this implies, and the spine of the redesign:**

> **They sell you a feeling. We sell the feeling and then show you the working.**

Be as human as Haven at the top of the page, then land proof they structurally
cannot answer. The page already has two live, interactive proofs (§5). Design
around them — they are the reason to visit.

---

## 4. Current state

`app/page.tsx` renders, in order: hero → "Sound familiar" (three lines of pain at
display scale) → the playable Value Matrix → one concept two ways → what else it
holds + the context wall → who it is for → price → FAQ → close.

**Known weaknesses to fix — these are the brief:**

- The hero is type on a dark field and has no presence next to Haven's.
- Vertical rhythm is uniform: nearly every band is a heading, a paragraph, and a
  grid. Sections read as interchangeable.
- Left-aligned editorial columns leave large empty right-hand areas at desktop
  widths without earning them.
- Motion is one device — a fade-and-rise on scroll — applied to everything.
- There is no visual hierarchy between the two interactive proofs and the
  ordinary informational bands. The best things on the page do not look like it.
- No product imagery of any kind (deliberately — see §6).

---

## 5. Do not break these

**The two interactive bands must keep working exactly as they do.**

- `components/value-matrix-demo.tsx` runs a real port of the product's decision
  engine (`lib/value-matrix/counts.ts`, `lib/value-matrix/value.ts`). Restyle it
  freely; do not change its arithmetic, its input ranges, or its behaviour. Its
  central behaviour is that **impossible input is REFUSED and never clamped** —
  that refusal is a designed feature and the page argues from it. Keep it
  visible and legible, not buried.
- `components/concept-switch.tsx` is the storyboard/digital-twin band. Selecting
  a moment lights the components that serve it. Exactly three component kinds
  carry the "12-question contract" badge; do not add it to others.
- `lib/value-matrix/*` and `lib/pricing.ts` are ported from the product repo. Do
  not edit their logic. Price figures come from `lib/pricing.ts` only.

**The CTA is a deliberate stub.** `components/cta.tsx` renders a
non-clickable "Launching soon" until `NEXT_PUBLIC_HOSTED_SIGNUP_URL` is set. Do
not make it clickable, do not point it at a placeholder, a mailto or an
email-capture form. Style it; do not wire it.

**Design tokens live in `app/globals.css`** and the palette is settled: warm deep
charcoal (`--bg: #0b0a08`) with a bright olive accent (`--accent: #a8ce49`).
Type is Outfit (display) + DM Sans (body). **Do not drift toward violet or
indigo** — the entire category runs cool purple and being warm is the point. You
may extend the token set; do not replace the palette.

Read the comments in `app/globals.css` before editing it. Several carry
hard-won reasons — the `@layer components` wrapper around `.display`, the
`--faint` contrast value, the `html.js` scoping of `.reveal`.

---

## 6. No placeholder media

The page previously carried dashed-outline `MediaSlot` frames standing in for
footage that was never shot, and the verdict on seeing them was that the page
"doesn't look good at all". They were all removed. **An e2e test now fails if any
`MediaSlot` reaches the live page.**

There are no product screenshots or video available to you. Design a page that
is excellent *without* photography — the two live interactive bands are the
substitute, and making them look like the centrepiece is most of the job. If a
band genuinely needs an image, cut the band.

You may add CSS/SVG-drawn visuals of your own. The page currently has a fixed
film-grain field and radial "halo" glows; keep, replace or improve them.

---

## 7. Gates — all four must pass

```bash
npm run build          # next build
npx tsc --noEmit       # types
npm run lint           # eslint
npm run e2e            # Playwright — 26 tests, all must pass
```

The e2e suite is unusually opinionated because each test guards a bug that
actually shipped. A redesign will trip these unless you plan for them:

- **No horizontal overflow, and no text painting outside its box**, at 390 /
  768 / 1024 / 1440 px. It measures with `Range.getBoundingClientRect()`, not
  `scrollWidth`, so a too-wide word at display scale is caught.
- **Tap targets ≥ 40px tall at 390px** for every `a`, `button` and `summary` not
  inside a `p`, `li`, `dd` or `blockquote`.
- **No `.reveal` element may be left at opacity < 0.9** after a fast jump-scroll
  to the bottom and back. If you replace the reveal mechanism, it must survive a
  scroll that skips frames, and it must not depend on JavaScript running at all.
- **The page must render fully with JavaScript disabled.**
- **`og:description` in `app/layout.tsx` must match the `<h1>` word for word**
  (normalised for case, punctuation and curly apostrophes). Change the headline,
  change the meta tag in the same commit.
- **No dollar figure outside the Value Matrix band** may be anything other than
  `$19.99` or `$199.99`.
- The retired-framing sweep, the no-Payable check and the no-trial check run
  across `/`, `/privacy`, `/terms` and all six `/docs` pages — not just the
  landing page.

If a test genuinely contradicts a better design, change the test **and write
down why in a comment above it**. Do not delete a guard silently.

---

## 8. Scope

**In scope:** `app/page.tsx`, `app/globals.css`, `app/layout.tsx`,
`components/site-chrome.tsx`, `components/reveal.tsx`, and the presentation
layer of `components/value-matrix-demo.tsx` and `components/concept-switch.tsx`.
Adding new components is fine.

**Out of scope:** wiring signup; `lib/**` logic; the `/docs`, `/privacy` and
`/terms` page content (restyling their shared chrome is fine); anything in the
`system-1` product repo.

**Deliverable:** the redesigned page, with all four gates passing, plus a short
note on what you changed structurally and why — and anything you deliberately
left alone.
