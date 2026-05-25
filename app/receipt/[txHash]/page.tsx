type ReceiptPageProps = {
  params: Promise<{
    txHash: string;
  }>;
};

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { txHash } = await params;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-medium text-cyan-200">ArcTipJar</p>
          <h1 className="mt-2 text-4xl font-bold">Receipt</h1>
          <p className="mt-3 text-slate-300">
            This placeholder receipt shows how confirmed Arc tips will appear.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Amount</p>
              <p className="mt-1 font-semibold">5 USDC</p>
            </div>

            <div className="rounded-lg bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Transaction hash</p>
              <p className="mt-1 break-all font-mono text-sm text-cyan-100">
                {txHash}
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-1 font-semibold">Confirmed on Arc</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
