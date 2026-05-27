import Link from "next/link";
import {
  AddArcNetworkButton,
  ArcTestnetNotice,
} from "@/components/add-arc-network-button";
import { ConnectWalletButton } from "@/components/connect-wallet-button";

const navLinks = [
  { label: "Create", href: "/create" },
  { label: "Demo", href: "/arc" },
  { label: "Dashboard", href: "/dashboard" },
];

const features = [
  {
    title: "Simple tip links",
    description:
      "Launch a clean public page for a creator, project, or community and share it anywhere.",
  },
  {
    title: "USDC payments",
    description:
      "Supporters send Arc Testnet USDC through the deployed ArcTipJar contract.",
  },
  {
    title: "Onchain receipts",
    description:
      "Successful tips redirect to a receipt page with the ArcScan transaction link.",
  },
  {
    title: "Creator dashboard",
    description:
      "Track totals, supporters, and recent activity from one simple dashboard view.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create your jar",
    description: "Choose a username, add a wallet, and describe what supporters are funding.",
  },
  {
    step: "02",
    title: "Share your link",
    description: "Drop your ArcTipJar URL into posts, profiles, chats, and community updates.",
  },
  {
    step: "03",
    title: "Receive USDC tips",
    description: "Supporters pick an amount, add a note, and send USDC on Arc Testnet.",
  },
];

const testSteps = [
  "Connect wallet",
  "Add Arc Testnet",
  "Create or open a tip jar",
  "Send a USDC testnet tip",
  "View receipt on ArcScan",
];

const footerLinks = [
  { label: "Live app", href: "https://arctipjar.vercel.app" },
  { label: "GitHub", href: "https://github.com/Ohmyni/arctipjar" },
  {
    label: "Contract on ArcScan",
    href: "https://testnet.arcscan.app/address/0xB65396797aeC75F7B4a0e2661af16319f8D8FfF9",
  },
  { label: "ArcScan explorer", href: "https://testnet.arcscan.app" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300 font-black text-slate-950">
        A
      </span>
      <span>
        <span className="block text-base font-bold leading-5">ArcTipJar</span>
        <span className="block text-xs text-slate-400">
          Simple USDC tip jars on Arc
        </span>
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#06111f]/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-cyan-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <AddArcNetworkButton />
            <ConnectWalletButton />
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              Simple USDC tip jars on Arc
            </p>
            <p className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100">
              Live on Arc Testnet
            </p>
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
            Create a USDC tip jar on Arc.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            ArcTipJar helps creators, builders, and communities receive USDC
            tips through a simple link.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/create"
              className="rounded-lg bg-cyan-300 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Create public jar
            </Link>
            <Link
              href="/arc"
              className="rounded-lg border border-white/15 px-6 py-3 text-center font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
            >
              View Arc jar
            </Link>
          </div>
          <div className="mt-5 max-w-2xl">
            <ArcTestnetNotice />
          </div>
        </div>

        <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/40">
          <div className="rounded-lg border border-white/10 bg-[#0a1728] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-300 text-2xl font-black text-slate-950">
                  A
                </div>
                <div>
                  <p className="text-sm text-cyan-200">Featured creator</p>
                  <h2 className="mt-1 text-2xl font-bold">@arc</h2>
                  <p className="text-sm text-slate-400">Arc ecosystem notes</p>
                </div>
              </div>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                Arc Testnet
              </span>
            </div>

            <p className="mt-6 rounded-lg bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
              Funding public writing, builder experiments, and community guides
              for people exploring Arc.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {["1", "5", "10"].map((amount) => (
                <div
                  key={amount}
                  className="rounded-lg border border-white/10 bg-slate-950/80 p-4 text-center"
                >
                  <p className="text-2xl font-bold">{amount}</p>
                  <p className="text-xs font-medium text-slate-400">USDC</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/80 p-4">
              <div>
                <p className="text-sm text-slate-400">Receipt</p>
                <p className="mt-1 text-sm text-cyan-100">
                  ArcScan-linked transaction record
                </p>
              </div>
              <p className="text-sm font-semibold text-emerald-300">
                Onchain
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-white/10 bg-white/[0.05] p-5"
            >
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            From profile to payment flow in three steps.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((item) => (
            <article
              key={item.step}
              className="rounded-lg border border-white/10 bg-[#0a1728] p-6"
            >
              <p className="text-sm font-bold text-cyan-200">{item.step}</p>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            How to test
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Try the Arc Testnet flow end to end.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {testSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-lg border border-white/10 bg-slate-950/70 p-4"
              >
                <p className="text-xs font-bold text-cyan-200">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p>ArcTipJar. Simple USDC tip jars on Arc.</p>
            <p className="mt-1">
              Live on Arc Testnet with Supabase profiles and ArcScan receipts.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-300 transition hover:text-cyan-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
