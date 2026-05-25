import Link from "next/link";

const stats = [
  { label: "Total received", value: "0 USDC", detail: "Settled tips" },
  { label: "Total tips", value: "0", detail: "Completed payments" },
  { label: "Recent supporters", value: "0", detail: "Last 30 days" },
];

const columns = ["Supporter", "Amount", "Message", "Tx hash", "Status"];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-bold">
            ArcTipJar
          </Link>
          <Link
            href="/create"
            className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Create jar
          </Link>
        </div>

        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Creator dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Tip activity
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Onchain tip history will appear here once wallet payments are
            connected.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <section
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
              <p className="mt-2 text-xs font-medium text-cyan-200">
                {stat.detail}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.06]">
          <div className="flex flex-col gap-2 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent tips</h2>
              <p className="mt-1 text-sm text-slate-400">
                A sample layout for future supporter payments.
              </p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
              Empty state
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-950/70 text-slate-400">
                <tr>
                  {columns.map((column) => (
                    <th key={column} className="px-5 py-4 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="px-5 py-16 text-center">
                    <p className="text-lg font-semibold text-white">
                      No tips yet
                    </p>
                    <p className="mt-2 text-slate-400">
                      Share your ArcTipJar link to start receiving USDC tips.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
