import type { Address } from "viem";
import {
  ARC_CHAIN_ID,
  ARC_EXPLORER_URL,
  ARC_RPC_URL,
  ARC_USDC_TOKEN_ADDRESS,
} from "@/lib/chains";

export { ARC_CHAIN_ID, ARC_EXPLORER_URL, ARC_RPC_URL };

export const ARC_USDC_ADDRESS = (process.env.NEXT_PUBLIC_ARC_USDC_ADDRESS ??
  ARC_USDC_TOKEN_ADDRESS) as Address;

export const ARCTIPJAR_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_ARCTIPJAR_CONTRACT_ADDRESS as Address | undefined;

export const DEMO_CREATOR_ADDRESS =
  process.env.NEXT_PUBLIC_DEMO_CREATOR_ADDRESS as Address | undefined;

export const USDC_DECIMALS = 6;

export const erc20Abi = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export const arcTipJarAbi = [
  {
    type: "function",
    name: "tip",
    stateMutability: "nonpayable",
    inputs: [
      { name: "creator", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "message", type: "string" },
    ],
    outputs: [],
  },
  {
    type: "event",
    name: "TipSent",
    inputs: [
      { name: "sender", type: "address", indexed: true },
      { name: "creator", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "message", type: "string", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
] as const;
