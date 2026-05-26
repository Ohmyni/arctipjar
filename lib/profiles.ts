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

export type ProfileRow = {
  username: string;
  display_name: string;
  recipient_wallet: string;
  bio: string | null;
  social_link: string | null;
  created_at: string | null;
};

export const defaultArcProfile: TipJarProfile = {
  username: "arc",
  displayName: "Arc",
  recipientWallet: DEMO_CREATOR_ADDRESS,
  bio: "Support Arc ecosystem notes and builder experiments.",
  socialLink: "https://arctipjar.vercel.app",
  createdAt: "2026-05-26T00:00:00.000Z",
};

export function mapProfileRow(row: ProfileRow): TipJarProfile {
  return {
    username: row.username,
    displayName: row.display_name,
    recipientWallet: row.recipient_wallet as Address,
    bio: row.bio ?? "",
    socialLink: row.social_link ?? "",
    createdAt: row.created_at ?? "",
  };
}
