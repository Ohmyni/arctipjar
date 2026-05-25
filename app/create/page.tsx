import Link from "next/link";

const fields = [
  {
    id: "username",
    label: "Username",
    placeholder: "mokondo",
    helper: "Your public page will use this handle.",
  },
  {
    id: "displayName",
    label: "Display name",
    placeholder: "Mokondo",
    helper: "Shown at the top of your creator card.",
  },
  {
    id: "wallet",
    label: "Recipient wallet",
    placeholder: "0x...",
    helper: "Demo-only for now. No wallet transaction will be created.",
  },
  {
    id: "link",
    label: "Project / social link",
    placeholder: "https://x.com/...",
    helper: "A profile, project, or community link supporters can trust.",
  },
];

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="font-bold text-white">
            ArcTipJar
          </Link>
          <Link
            href="/mokondo"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Preview demo
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Creator onboarding
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Create your tip jar
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
              Set up a polished public page for receiving USDC tips on Arc.
              This MVP is demo-only, so the form does not save data yet.
            </p>

            <div className="mt-8 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-sm font-semibold text-cyan-100">
                Your shareable link
              </p>
              <p className="mt-2 break-all font-mono text-sm text-cyan-50">
                arctipjar.vercel.app/username
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Replace username with the handle you choose below. Profile
                saving and custom links will be added after the frontend demo.
              </p>
            </div>
          </section>

          <form className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30">
            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.id} className={field.id === "wallet" ? "md:col-span-2" : ""}>
                  <label
                    className="text-sm font-medium text-slate-200"
                    htmlFor={field.id}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.id === "link" ? "url" : "text"}
                    placeholder={field.placeholder}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
                  />
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {field.helper}
                  </p>
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell supporters what they are funding."
                  className="mt-2 min-h-32 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
                />
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Keep it short, specific, and easy to scan.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Create tip jar
            </button>
            <p className="mt-4 text-center text-sm text-slate-500">
              Demo-only: no database, wallet connection, or smart contract is
              connected yet.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
