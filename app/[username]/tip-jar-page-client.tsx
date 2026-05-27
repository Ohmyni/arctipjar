"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAddress } from "viem";
import {
  AddArcNetworkButton,
  ArcTestnetNotice,
} from "@/components/add-arc-network-button";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import {
  defaultArcProfile,
  mapProfileRow,
  type ProfileRow,
  type TipJarProfile,
} from "@/lib/profiles";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { TipForm } from "./tip-form";

type TipJarPageClientProps = {
  username: string;
};

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function TipJarPageClient({ username }: TipJarPageClientProps) {
  const normalizedUsername = username.toLowerCase();
  const isDefaultArcProfile = normalizedUsername === "arc";
  const [profile, setProfile] = useState<TipJarProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoading(true);
      setLoadError(null);

      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        if (isMounted) {
          setProfile(isDefaultArcProfile ? defaultArcProfile : null);
          setLoadError(
            isDefaultArcProfile
              ? null
              : "Supabase profile storage is not configured yet.",
          );
          setIsLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "username, display_name, recipient_wallet, bio, social_link, created_at",
        )
        .eq("username", normalizedUsername)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        setProfile(isDefaultArcProfile ? defaultArcProfile : null);
        setLoadError(error.message);
        setIsLoading(false);
        return;
      }

      if (data) {
        const row = data as ProfileRow;

        if (row.username && row.display_name && isAddress(row.recipient_wallet)) {
          setProfile(mapProfileRow(row));
        } else {
          setProfile(isDefaultArcProfile ? defaultArcProfile : null);
          setLoadError("This profile has an invalid recipient wallet.");
        }
      } else {
        setProfile(isDefaultArcProfile ? defaultArcProfile : null);
      }

      setIsLoading(false);
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [isDefaultArcProfile, normalizedUsername]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl text-slate-300">Loading tip jar...</div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="font-bold">
            ArcTipJar
          </Link>
          <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.06] p-8 text-center">
            <h1 className="text-3xl font-bold">Tip jar not found</h1>
            <p className="mt-4 text-slate-300">
              {loadError ?? "This tip jar was not found."}
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Create public jar
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const initial = profile.displayName.slice(0, 1).toUpperCase() || "A";

  return (
    <main className="min-h-screen bg-[#06111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-bold">
            ArcTipJar
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="hidden rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:inline-flex"
            >
              Create jar
            </Link>
            <AddArcNetworkButton />
            <ConnectWalletButton />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <span className="mb-5 inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              Live on Arc Testnet
            </span>
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-3xl font-black text-slate-950">
                {initial}
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-200">Creator jar</p>
                <h1 className="mt-1 text-3xl font-bold">{profile.displayName}</h1>
                <p className="mt-1 text-slate-400">@{profile.username}</p>
                <p className="mt-3 leading-7 text-slate-300">
                  {profile.bio || "Send a USDC tip on Arc Testnet and leave a note."}
                </p>
                {profile.socialLink ? (
                  <a
                    href={profile.socialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-sm font-medium text-cyan-200 hover:text-cyan-100"
                  >
                    {profile.socialLink}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Recipient</p>
                <p className="mt-2 font-mono text-sm font-bold text-cyan-100">
                  {shortenAddress(profile.recipientWallet)}
                </p>
              </div>
              <div className="rounded-lg bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Network</p>
                <p className="mt-2 text-xl font-bold">Arc Testnet</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30">
            <TipForm profile={profile} />
            <div className="mt-4">
              <ArcTestnetNotice />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
