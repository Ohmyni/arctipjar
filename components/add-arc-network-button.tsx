"use client";

import { useState } from "react";
import {
  ARC_CHAIN_ID_HEX,
  ARC_EXPLORER_URL,
  ARC_FAUCET_URL,
  ARC_RPC_URL,
  arc,
} from "@/lib/chains";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

function getEthereumProvider() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return (window as Window & { ethereum?: EthereumProvider }).ethereum;
}

export function ArcTestnetNotice() {
  return (
    <p className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm leading-6 text-cyan-50">
      ArcTipJar currently supports Arc Testnet with real USDC testnet tipping.
    </p>
  );
}

export function AddArcNetworkButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  async function addArcTestnet() {
    setMessage(null);

    const ethereum = getEthereumProvider();
    if (!ethereum) {
      setMessage("No wallet was detected. Install or unlock a browser wallet first.");
      return;
    }

    setIsAdding(true);

    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ARC_CHAIN_ID_HEX,
            chainName: arc.name,
            nativeCurrency: arc.nativeCurrency,
            rpcUrls: [ARC_RPC_URL],
            blockExplorerUrls: [ARC_EXPLORER_URL],
          },
        ],
      });

      setMessage("Arc Testnet request sent to your wallet.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Your wallet rejected or could not complete the network request.",
      );
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={addArcTestnet}
        disabled={isAdding}
        className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isAdding ? "Opening Wallet..." : "Add Arc Testnet"}
      </button>
      {message ? <p className="text-xs leading-5 text-amber-100">{message}</p> : null}
      <p className="sr-only">Arc Testnet faucet: {ARC_FAUCET_URL}</p>
    </div>
  );
}
