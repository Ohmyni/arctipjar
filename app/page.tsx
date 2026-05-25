import Link from "next/link";

const features = [
  {
    title: "Simple link",
    description:
      "Create a public ArcTipJar page and share it with supporters anywhere.",
  },
  {
    title: "USDC payments",
    description:
      "Give creators, builders, and communities a straightforward way to receive USDC tips.",
  },
  {
    title: "Onchain receipts",
    description:
      "Show a receipt with a transaction hash once wallet and Arc payments are connected.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              ArcTipJar
            </p>

            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
              Create a USDC tip jar on Arc.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              ArcTipJar helps creators, builders, and communities receive USDC
              tips through a simple link they can share anywhere.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create"
                className="rounded-lg bg-cyan-300 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Create tip jar
              </Link>

              <Link
                href="/mokondo"
                className="rounded-lg border border-white/15 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                View sample jar
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">Sample jar</p>
                <p className="mt-1 text-2xl font-bold">@mokondo</p>
              </div>
              <div className="rounded-full bg-cyan-300 px-3 py-1 text-sm font-semibold text-slate-950">
                Arc
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {["1", "5", "10"].map((amount) => (
                <div
                  key={amount}
                  className="rounded-lg border border-white/10 bg-slate-900 px-3 py-4 text-center"
                >
                  <p className="text-xl font-semibold">{amount}</p>
                  <p className="text-xs text-slate-400">USDC</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Receipt preview</p>
              <p className="mt-2 break-all font-mono text-sm text-cyan-100">
                0x123...arc
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            >
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
