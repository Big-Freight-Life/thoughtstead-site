# Site design system

The marketing site follows the app's design system. The site does not import
the app's code, so every token below is mirrored by hand in `app/globals.css`.
The source of truth is the app repo (`system-1`):

- `src/app/globals.css` for tokens (radius scale, colour, focus ring, type)
- `docs/design-system.md` and `docs/superpowers/specs/2026-11-13-design-system-design.md`
  for the rules
- `src/frontend/ui/button.tsx`, `card.tsx`, `panel.tsx` for how they look

When the app retunes a token, change it here in the same pass.

## Rules

- **No texture patterns.** No dots, grain, noise, grid, hatch or diagonal
  decoration, as a page background or an overlay. Soft colour glows that are part
  of an image (the stage glow behind the handset, the showcase atmosphere) stay.
- **Weights 400, 500, 600 only.** Never 650, 700 or 750. `--w-title` is 600.
- **Surfaces have no border and no shadow.** A card is `--surface` with a radius;
  separation comes from tone and spacing. Where a divider is needed, one quiet
  `--line` hairline.
- **Text floor is 11px** outside the product mockups (the phone, watch and
  showcase screens are pictures of the app and keep their own scale).
- Brand accents (acid, coral, sky) appear only as marks: the "No hostage data"
  highlighter, status diamonds, chapter markers.

## Tokens mirrored from the app

| Site token | Value | App token (`src/app/globals.css`) |
| --- | --- | --- |
| `--bg` | `#fcfcfb` | `--background` |
| `--surface` | `#f7f5ef` | `--card` |
| `--surface-2` | `#e5e2d8` | `--muted` |
| `--surface-3` | `#d8d5cb` | `--deep` |
| `--shell` | `#f0eee5` | `--shell` (inside mockups) |
| `--muted` | `#66645d` | `--muted-foreground` (5.77:1 on the page) |
| `--faint` | `#6b6e6b` | site only, 5.03:1 on the page, 4.74:1 on a card |
| `--line` / `--line-2` | `#d2cfc5` / `#a9a59a` | `--border` / `--border-strong` |
| `--control-border` | `#827e73` | `--control-border` (3.95:1, the edge of a control) |
| `--accent-fill` | `#2457ff` | `--action-fill` |
| `--accent` | `#1747e6` | `--action` (hover) |
| `--accent-active` | `#1239ba` | `--action-active` |
| `--ring` | `#2457ff` | `--ring` |

Fonts are unchanged: DM Sans for structure, Geist Mono for micro-labels.

## Radius scale

One number, `--radius: .5rem`, derives the rest exactly as in the app. Tailwind's
own `rounded-*` utilities resolve to the same scale through `@theme`.

| Token | Value | Use on the site |
| --- | --- | --- |
| `--radius-sm` | .3rem (~5px) | chips, inline code |
| `--radius-md` | .4rem (~6px) | buttons, tabs |
| `--radius-lg` | .5rem (8px) | inputs |
| `--radius-xl` | .7rem (~11px) | cards, panels, the price card, FAQ rows, tables, code blocks |
| `--radius-2xl` | .9rem (~14px) | the large dark stage and the showcase screen |

`rounded-full` stays for avatars, dots and the play button.

## Buttons

Classes are on `.hosted-cta` (`components/cta.tsx`, the early access form).

| Class | Look | When |
| --- | --- | --- |
| `.hosted-cta-live` | filled cobalt, white label | the one main action in a view |
| `.hosted-cta-outline` | transparent, `--control-border` edge | secondary action |
| `.hosted-cta-ghost` | text only, soft cobalt wash on hover | low emphasis |
| `.hosted-cta-stub` | flat muted fill, not a control | the deliberate "Launching soon" stub: a `span`, never clickable |

Sizes: default 36px, `.hosted-cta-large` 44px (hero and closing CTAs). Live
buttons are 44px on a phone. Labels are sentence case; only small mono
micro-labels are uppercase. Focus is one 2px solid `--ring` outline with a 2px
offset, set once for every interactive element.

## Contrast

Text 4.5:1 and non-text marks 3:1 on their surface. The e2e suite pins the page
canvas (`landing sections share one white canvas`) and phone tap targets.
