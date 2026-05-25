import Link from "next/link";

type ReceiptPageProps = {
  params: Promise<{
    txHash: string;
  }>;
};

const receiptRows = [
  { label: "Amount", value: "5 USDC" },
  { label: "Sender", value: "Demo supporter" },
  { label: "Recipient", value: "@mokondo" },
  { label: "Status", value: "Confirmed on Arc" },
];

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { txHash } = await params;

  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-bold">
            ArcTipJar
          </Link>
          <Link
            href="/mokondo"
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
              <h1 className="mt-3 text-4xl font-bold">Receipt confirmed</h1>
              <p className="mt-3 max-w-xl text-slate-300">
                This demo receipt shows how ArcTipJar will display confirmed
                onchain tips after wallet payments are connected.
              </p>
            </div>
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-200">
              Confirmed on Arc
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {receiptRows.map((row) => (
              <div key={row.label} className="rounded-lg bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">{row.label}</p>
                <p className="mt-2 font-semibold">{row.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">Transaction hash</p>
            <p className="mt-2 break-all font-mono text-sm text-cyan-100">
              {txHash}
            </p>
          </div>

          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-500"
          >
            Arc explorer link coming soon
          </button>
        </section>
      </div>
    </main>
  );
}
