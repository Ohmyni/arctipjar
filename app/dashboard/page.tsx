const stats = [
  { label: "Total received", value: "0 USDC" },
  { label: "Total tips", value: "0" },
  { label: "Recent supporters", value: "0" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-cyan-200">ArcTipJar</p>
          <h1 className="mt-2 text-4xl font-bold">Dashboard</h1>
          <p className="mt-3 text-slate-300">
            Track USDC tips once profiles and payments are connected.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <section
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Recent tips</h2>
          <div className="flex min-h-48 items-center justify-center text-center">
            <div>
              <p className="text-lg font-semibold">No tips yet</p>
              <p className="mt-2 text-sm text-slate-400">
                Share your ArcTipJar link to start receiving USDC tips.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
