import type { Chain } from "viem";

export const ARC_CHAIN_ID = 5042002;
export const ARC_CHAIN_ID_HEX = "0x4cef52";
export const ARC_RPC_URL = "https://rpc.testnet.arc.network";
export const ARC_WS_URL = "wss://rpc.testnet.arc.network";
export const ARC_EXPLORER_URL = "https://testnet.arcscan.app";
export const ARC_FAUCET_URL = "https://faucet.circle.com";

// TODO: Replace with the official USDC token address on Arc Testnet before adding token transfers.
export const ARC_USDC_TOKEN_ADDRESS =
  "0x0000000000000000000000000000000000000000";

export const arc = {
  id: ARC_CHAIN_ID,
  name: "Arc Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "USDC",
    symbol: "USDC",
  },
  rpcUrls: {
    default: {
      http: [ARC_RPC_URL],
      webSocket: [ARC_WS_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: ARC_EXPLORER_URL,
    },
  },
  testnet: true,
} as const satisfies Chain;
