import Link from "next/link";
import {
  AddArcNetworkButton,
  ArcTestnetNotice,
} from "@/components/add-arc-network-button";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { DashboardEvents } from "./dashboard-events";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-bold">
            ArcTipJar
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="hidden rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 sm:inline-flex"
            >
              Create jar
            </Link>
            <AddArcNetworkButton />
            <ConnectWalletButton />
          </div>
        </div>

        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Creator dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Tip activity
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Dashboard stats are read from Arc Testnet TipSent events emitted by
            the deployed ArcTipJar contract.
          </p>
          <p className="mt-3 max-w-2xl rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
            Creator-specific dashboards will be added after wallet-based
            profile ownership.
          </p>
          <div className="mt-4 max-w-2xl">
            <ArcTestnetNotice />
          </div>
        </section>

        <DashboardEvents />
      </div>
    </main>
  );
}
