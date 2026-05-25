import Link from "next/link";
import {
  AddArcNetworkButton,
  ArcTestnetNotice,
} from "@/components/add-arc-network-button";
import { ConnectWalletButton } from "@/components/connect-wallet-button";

type TipPageProps = {
  params: Promise<{
    username: string;
  }>;
};

const suggestedAmounts = ["1", "5", "10"];

export default async function TipPage({ params }: TipPageProps) {
  const { username } = await params;
  const initial = username.slice(0, 1).toUpperCase() || "A";

  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-bold">
            ArcTipJar
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="hidden rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:inline-flex"
            >
              Create your jar
            </Link>
            <AddArcNetworkButton />
            <ConnectWalletButton />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-3xl font-black text-slate-950">
                {initial}
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-200">Creator jar</p>
                <h1 className="mt-1 text-3xl font-bold">@{username}</h1>
                <p className="mt-3 leading-7 text-slate-300">
                  Supporting experiments, writing, and community work around
                  Arc. Send a small USDC tip and leave a note.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Received</p>
                <p className="mt-2 text-xl font-bold">0 USDC</p>
              </div>
              <div className="rounded-lg bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Supporters</p>
                <p className="mt-2 text-xl font-bold">0</p>
              </div>
              <div className="rounded-lg bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Network</p>
                <p className="mt-2 text-xl font-bold">Arc</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Send a tip</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Choose an amount in USDC.
                </p>
              </div>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                Demo mode
              </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="rounded-lg border border-white/10 bg-slate-950/80 px-3 py-5 text-center transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                >
                  <span className="block text-2xl font-bold">{amount}</span>
                  <span className="text-xs font-medium text-slate-400">USDC</span>
                </button>
              ))}
            </div>

            <label
              className="mt-5 block text-sm font-medium text-slate-200"
              htmlFor="customAmount"
            >
              Custom amount
            </label>
            <input
              id="customAmount"
              name="customAmount"
              inputMode="decimal"
              placeholder="25"
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
            />

            <label
              className="mt-5 block text-sm font-medium text-slate-200"
              htmlFor="message"
            >
              Optional message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Leave a note for the creator"
              className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
            />

            <button
              type="button"
              disabled
              className="mt-5 w-full cursor-not-allowed rounded-lg bg-cyan-300/70 px-5 py-3 font-semibold text-slate-950"
            >
              Send tip
            </button>
            <p className="mt-4 rounded-lg border border-white/10 bg-slate-950/70 p-3 text-center text-sm text-slate-400">
              Wallet connection is enabled, USDC tipping is coming next.
            </p>
            <div className="mt-4">
              <ArcTestnetNotice />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
