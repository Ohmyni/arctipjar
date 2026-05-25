import type { Chain } from "viem";

// TODO: Replace this placeholder chain ID with the real Arc chain ID.
export const ARC_CHAIN_ID = 999999;

// TODO: Replace this placeholder RPC URL with the official Arc RPC URL.
export const ARC_RPC_URL = "https://rpc.arc-placeholder.example";

// TODO: Replace this placeholder explorer URL with the official Arc explorer URL.
export const ARC_EXPLORER_URL = "https://explorer.arc-placeholder.example";

// TODO: Replace this placeholder address with the official USDC token address on Arc.
export const ARC_USDC_TOKEN_ADDRESS =
  "0x0000000000000000000000000000000000000000";

export const arc = {
  id: ARC_CHAIN_ID,
  name: "Arc",
  nativeCurrency: {
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
  },
  rpcUrls: {
    default: {
      http: [ARC_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Arc Explorer",
      url: ARC_EXPLORER_URL,
    },
  },
} as const satisfies Chain;
