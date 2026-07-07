const CHECKOUT_URL = process.env.NEXT_PUBLIC_POLAR_CHECKOUT_URL;

export function BuyButton({ large = false }: { large?: boolean }) {
  if (!CHECKOUT_URL) {
    return (
      <span className="inline-block rounded-md border border-[#1A1714]/20 px-5 py-2.5 text-sm opacity-60">
        Launching soon
      </span>
    );
  }
  return (
    <a
      href={CHECKOUT_URL}
      data-testid="buy-button"
      className={`inline-block rounded-md bg-[#1A1714] text-[#FAF7F2] hover:bg-[#3F6212] transition-colors ${
        large ? 'px-7 py-3.5 text-lg' : 'px-5 py-2.5 text-sm'
      }`}
    >
      Get Thoughtstead — $199 <s className="opacity-50 ml-1">$299</s>
    </a>
  );
}
