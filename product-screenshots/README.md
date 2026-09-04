# Product screenshot drop

Place approved, public-safe Thoughtstead screenshots here before preparing them
for the site. Do not copy captures from an authenticated workspace into
`public/` without reviewing every visible record first.

The landing-page layout expects three 16:10 images:

- `digital-twin.png`
- `value-matrix.png`
- `approval-queue.png`

The current public assets are deliberately labelled SVG placeholders. When the
final captures are approved, copy the PNGs to `public/product-screenshots/` and
change the three `src` values in `components/product-showcase.tsx` from `.svg`
to `.png`.
