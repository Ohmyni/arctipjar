export default function CreatePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-cyan-200">ArcTipJar</p>
          <h1 className="mt-2 text-4xl font-bold">Create your tip jar</h1>
          <p className="mt-3 text-slate-300">
            Set up your public tip page so supporters can send you USDC on Arc.
          </p>
        </div>

        <form className="space-y-5 rounded-lg border border-white/10 bg-white/5 p-6">
          <div>
            <label className="text-sm font-medium text-slate-300" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              placeholder="mokondo"
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-300"
              htmlFor="displayName"
            >
              Display name
            </label>
            <input
              id="displayName"
              name="displayName"
              placeholder="Mokondo"
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300" htmlFor="wallet">
              Recipient wallet
            </label>
            <input
              id="wallet"
              name="wallet"
              placeholder="0x..."
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 font-mono outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Builder on Arc..."
              className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300" htmlFor="link">
              Project / social link
            </label>
            <input
              id="link"
              name="link"
              type="url"
              placeholder="https://x.com/..."
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Create tip jar
          </button>
        </form>
      </div>
    </main>
  );
}
