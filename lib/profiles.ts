import type { Address } from "viem";
import { DEMO_CREATOR_ADDRESS } from "@/lib/contracts";

export type TipJarProfile = {
  username: string;
  displayName: string;
  recipientWallet: Address;
  bio: string;
  socialLink: string;
  createdAt: string;
};

export const defaultArcProfile: TipJarProfile = {
  username: "arc",
  displayName: "Arc",
  recipientWallet: DEMO_CREATOR_ADDRESS,
  bio: "Support Arc ecosystem notes and builder experiments.",
  socialLink: "https://arctipjar.vercel.app",
  createdAt: "2026-05-26T00:00:00.000Z",
};

export function getProfileStorageKey(username: string) {
  return `arctipjar-profile-${username.toLowerCase()}`;
}
