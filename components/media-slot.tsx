// Designed placeholders for marketing media, not grey boxes.
//
// Every slot is a real, sized, composed frame so the page's rhythm is correct
// NOW and dropping an asset in later changes nothing about the layout. Each
// states what belongs in it, so whoever shoots the footage has the brief.
//
// TO FILL ONE: replace <MediaSlot> with an <Image>/<video> at the same ratio
// inside the same .frame wrapper. Keep the `id` stable — the asset list and the
// e2e count both refer to it.

export type MediaKind = 'video' | 'image';

const RATIO: Record<string, string> = {
  wide: 'aspect-[16/9]',
  hero: 'aspect-[16/10]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
};

export function MediaSlot({
  id,
  kind,
  brief,
  ratio = 'wide',
  className = '',
}: {
  id: string;
  kind: MediaKind;
  brief: string;
  ratio?: keyof typeof RATIO;
  className?: string;
}) {
  return (
    <figure
      data-media-slot={id}
      data-media-kind={kind}
      className={`frame relative w-full overflow-hidden ${RATIO[ratio]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-4 rounded-lg border border-dashed border-line-2"
      />
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-10 text-center">
        <span className="rounded-full border border-line-2 bg-accent-soft px-3 py-1 text-[0.7rem] font-medium text-accent">
          {kind === 'video' ? 'Video' : 'Image'} &middot; {id}
        </span>
        <span className="max-w-md text-sm leading-relaxed text-muted">{brief}</span>
      </figcaption>
    </figure>
  );
}
