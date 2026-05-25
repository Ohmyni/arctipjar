import Link from "next/link";
import {
  AddArcNetworkButton,
  ArcTestnetNotice,
} from "@/components/add-arc-network-button";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { TipForm } from "./tip-form";

type TipPageProps = {
  params: Promise<{
    username: string;
  }>;
};

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
                  Arc Testnet. Send a small USDC tip and leave a note.
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
                <p className="mt-2 text-xl font-bold">Arc Testnet</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30">
            <TipForm username={username} />
            <div className="mt-4">
              <ArcTestnetNotice />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
