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
  getProfileStorageKey,
  type TipJarProfile,
} from "@/lib/profiles";
import { TipForm } from "./tip-form";

type TipJarPageClientProps = {
  username: string;
};

function readLocalProfile(username: string) {
  const rawProfile = localStorage.getItem(getProfileStorageKey(username));

  if (!rawProfile) {
    return null;
  }

  try {
    const parsedProfile = JSON.parse(rawProfile) as TipJarProfile;
    if (
      parsedProfile.username &&
      parsedProfile.displayName &&
      isAddress(parsedProfile.recipientWallet)
    ) {
      return parsedProfile;
    }
  } catch {
    return null;
  }

  return null;
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function TipJarPageClient({ username }: TipJarPageClientProps) {
  const normalizedUsername = username.toLowerCase();
  const isDefaultArcProfile = normalizedUsername === "arc";
  const [profile, setProfile] = useState<TipJarProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (!isMounted) return;

      const localProfile = isDefaultArcProfile
        ? null
        : readLocalProfile(normalizedUsername);

      if (isDefaultArcProfile) {
        setProfile(defaultArcProfile);
      } else if (localProfile) {
        setProfile(localProfile);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

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
              This tip jar was not found in local demo storage.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-flex rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Create tip jar
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
              Create your jar
            </Link>
            <AddArcNetworkButton />
            <ConnectWalletButton />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-3xl font-black text-slate-950">
                {initial}
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-200">Creator jar</p>
                <h1 className="mt-1 text-3xl font-bold">{profile.displayName}</h1>
                <p className="mt-1 text-slate-400">@{profile.username}</p>
                <p className="mt-3 leading-7 text-slate-300">
                  {profile.bio || "Send an Arc Testnet USDC tip and leave a note."}
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

            {!isDefaultArcProfile ? (
              <p className="mt-5 rounded-lg border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
                Profile data is stored locally for this MVP. Shareable cloud
                profiles will be added next.
              </p>
            ) : null}

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
