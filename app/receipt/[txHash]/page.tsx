import Link from "next/link";
import { ARC_EXPLORER_URL, ARCTIPJAR_CONTRACT_ADDRESS } from "@/lib/contracts";

type ReceiptPageProps = {
  params: Promise<{
    txHash: string;
  }>;
};

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { txHash } = await params;
  const explorerUrl = `${ARC_EXPLORER_URL}/tx/${txHash}`;

  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-bold">
            ArcTipJar
          </Link>
          <Link
            href="/arc"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            View jar
          </Link>
        </div>

        <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30 md:p-8">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Tip receipt
              </p>
              <h1 className="mt-3 text-4xl font-bold">Transaction submitted</h1>
              <p className="mt-3 max-w-xl text-slate-300">
                Your tip transaction was submitted on Arc Testnet. Use ArcScan
                to inspect confirmation status and onchain details.
              </p>
            </div>
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-200">
              Arc Testnet
            </span>
          </div>

          <div className="mt-6 rounded-lg bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Transaction hash</p>
            <p className="mt-2 break-all font-mono text-sm text-cyan-100">
              {txHash}
            </p>
          </div>

          <div className="mt-4 rounded-lg bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Network</p>
            <p className="mt-2 font-semibold">Arc Testnet</p>
          </div>

          <div className="mt-4 rounded-lg bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Contract address</p>
            <p className="mt-2 break-all font-mono text-sm text-cyan-100">
              {ARCTIPJAR_CONTRACT_ADDRESS}
            </p>
          </div>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block w-full rounded-lg bg-cyan-300 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            View on ArcScan
          </a>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link
              href="/arc"
              className="rounded-lg border border-white/15 px-5 py-3 text-center font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Back to tip jar
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-white/15 px-5 py-3 text-center font-semibold text-slate-100 transition hover:bg-white/10"
            >
              View dashboard
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-slate-400">
            ArcTipJar shows verified transaction links only. Sender, recipient,
            and amount details can be inspected on ArcScan.
          </p>
        </section>
      </div>
    </main>
  );
}
