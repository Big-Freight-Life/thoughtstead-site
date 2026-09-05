import Image from 'next/image';

// Apple's own badge artwork, fetched from
// https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg
// (the US/UK black SVG linked from developer.apple.com/ios) and served
// unaltered from public/. Their guidelines allow proportional scaling above a
// 40px minimum height and nothing else — do not recolour it, redraw it, set it
// in the site's type, or crop the clear space around it.
//
// It follows the same discipline as HostedCta: with no listing to point at, the
// badge renders as a non-control rather than linking somewhere that 404s. Set
// NEXT_PUBLIC_APP_STORE_URL once the app is on the store and it becomes a link.
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL;

export const APP_STORE_LIVE = Boolean(APP_STORE_URL);

// 119.66 x 40 in the file, scaled to a 44px height.
const BADGE = (
  <Image
    src="/download-on-the-app-store.svg"
    alt="Download on the App Store"
    width={132}
    height={44}
    className="appstore-badge-art"
  />
);

export function AppStoreBadge() {
  if (!APP_STORE_URL) {
    return <span className="appstore-badge appstore-badge-stub">{BADGE}</span>;
  }
  return (
    <a className="appstore-badge" href={APP_STORE_URL}>
      {BADGE}
    </a>
  );
}
