import { BuyButton } from '@/components/buy-button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-semibold">Thoughtstead</h1>
      <BuyButton large />
    </main>
  );
}
