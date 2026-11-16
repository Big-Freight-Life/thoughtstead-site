# Motion sources

Sources for the looping graphics on the site. The site itself ships only the
rendered files in `public/`; nothing here is imported by the app.

## accountability

The graphic in the "Everything the work needs. Nothing happens without you."
section: an agent stopped at its boundary, a recommendation tied to its
evidence, and an action waiting at a gate for approval. Written as HTML + GSAP
for [HyperFrames](https://hyperframes.heygen.com).

Render (local only, no upload):

    cd motion/accountability
    npx hyperframes@0.9.56 render --format webm --quality high -o ../../public/governance-accountability.webm

The WebM keeps transparency so it blends into the page. The MP4 fallback is the
same composition rendered with an opaque `#12131a` background (change the
`background` on `html, body` in `index.html`), then scaled to 1920 wide.

## accountability-portrait

The same graphic laid out for phones (1080x1350). The wide version is unreadably
small at phone width, so the page swaps to this one at 800px and below
(`components/loop-video.tsx` renders both; CSS shows one).

    cd motion/accountability-portrait
    npx hyperframes@0.9.56 render --format webm --quality high -o ../../public/governance-accountability-portrait.webm
