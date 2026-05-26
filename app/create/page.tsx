"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { isAddress } from "viem";
import {
  AddArcNetworkButton,
  ArcTestnetNotice,
} from "@/components/add-arc-network-button";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { getSupabaseBrowserClient } from "@/lib/supabase";

function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
}

export default function CreatePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [recipientWallet, setRecipientWallet] = useState("");
  const [bio, setBio] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const normalizedUsername = normalizeUsername(username);
  const previewUsername = normalizedUsername || "username";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!normalizedUsername) {
      setError("Username is required. Use letters, numbers, or hyphens.");
      return;
    }

    if (!displayName.trim()) {
      setError("Display name is required.");
      return;
    }

    if (!isAddress(recipientWallet)) {
      setError("Recipient wallet must be a valid 0x address.");
      return;
    }

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setError(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable profile saving.",
      );
      return;
    }

    setIsSaving(true);

    const { error: insertError } = await supabase.from("profiles").insert({
      username: normalizedUsername,
      display_name: displayName.trim(),
      recipient_wallet: recipientWallet,
      bio: bio.trim() || null,
      social_link: socialLink.trim() || null,
    });

    if (insertError) {
      setIsSaving(false);
      if (insertError.code === "23505") {
        setError("That username is already taken. Try another one.");
        return;
      }

      setError(insertError.message);
      return;
    }

    router.push(`/${normalizedUsername}`);
  }

  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="font-bold text-white">
            ArcTipJar
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/arc"
              className="hidden rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:inline-flex"
            >
              View Arc jar
            </Link>
            <AddArcNetworkButton />
            <ConnectWalletButton />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Creator onboarding
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Create your public jar
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
              Publish a shareable ArcTipJar profile and choose the wallet that
              receives every USDC tip.
            </p>
            <p className="mt-4 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
              Profiles are saved with Supabase. Public jar pages route Arc
              Testnet USDC tips to the recipient wallet on the profile.
            </p>
            <div className="mt-4">
              <ArcTestnetNotice />
            </div>

            <div className="mt-8 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-sm font-semibold text-cyan-100">
                Your shareable link
              </p>
              <p className="mt-2 break-all font-mono text-sm text-cyan-50">
                arctipjar.vercel.app/{previewUsername}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Share this public page with supporters after creating your jar.
                Tips sent from the page settle through the ArcTipJar contract.
              </p>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-200" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="builder-name"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
                />
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Letters, numbers, and hyphens only.
                </p>
              </div>

              <div>
                <label
                  className="text-sm font-medium text-slate-200"
                  htmlFor="displayName"
                >
                  Display name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Arc Builder"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="wallet">
                  Recipient wallet
                </label>
                <input
                  id="wallet"
                  name="wallet"
                  value={recipientWallet}
                  onChange={(event) => setRecipientWallet(event.target.value)}
                  placeholder="0x..."
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 font-mono outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
                />
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  This wallet receives USDC tips sent from your public jar.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Tell supporters what their tips help fund."
                  className="mt-2 min-h-32 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="link">
                  Project / social link
                </label>
                <input
                  id="link"
                  name="link"
                  type="url"
                  value={socialLink}
                  onChange={(event) => setSocialLink(event.target.value)}
                  placeholder="https://x.com/..."
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
                />
              </div>
            </div>

            {error ? (
              <p className="mt-5 rounded-lg border border-red-300/25 bg-red-300/10 p-3 text-sm text-red-100">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSaving}
              className="mt-6 w-full rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-300/60"
            >
              {isSaving ? "Creating public jar..." : "Create public jar"}
            </button>
            <p className="mt-4 text-center text-sm text-slate-500">
              ArcTipJar currently supports Arc Testnet. Mainnet tipping is not
              enabled.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
