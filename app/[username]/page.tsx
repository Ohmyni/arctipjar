type TipPageProps = {
  params: Promise<{
    username: string;
  }>;
};

const suggestedAmounts = ["1", "5", "10"];

export default async function TipPage({ params }: TipPageProps) {
  const { username } = await params;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <div className="rounded-lg border border-white/10 bg-white/5 p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-300 text-2xl font-bold text-slate-950">
              {username.slice(0, 1).toUpperCase()}
            </div>

            <p className="text-sm font-medium text-cyan-200">ArcTipJar</p>
            <h1 className="mt-2 text-3xl font-bold">@{username}</h1>
            <p className="mt-4 text-slate-300">
              Support this creator with a USDC tip on Arc.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {suggestedAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className="rounded-lg border border-white/10 bg-slate-900 py-3 font-semibold transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
              >
                {amount} USDC
              </button>
            ))}
          </div>

          <label
            className="mt-5 block text-sm font-medium text-slate-300"
            htmlFor="customAmount"
          >
            Custom amount
          </label>
          <input
            id="customAmount"
            name="customAmount"
            inputMode="decimal"
            placeholder="25"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
          />

          <label
            className="mt-5 block text-sm font-medium text-slate-300"
            htmlFor="message"
          >
            Optional message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Leave a note"
            className="mt-2 min-h-24 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
          />

          <button
            type="button"
            className="mt-5 w-full rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Send tip
          </button>
        </div>
      </div>
    </main>
  );
}
