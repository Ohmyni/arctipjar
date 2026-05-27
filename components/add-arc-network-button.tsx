"use client";

import { useState } from "react";
import { useChainId } from "wagmi";
import {
  ARC_CHAIN_ID,
  ARC_CHAIN_ID_HEX,
  ARC_EXPLORER_URL,
  ARC_FAUCET_URL,
  ARC_RPC_URL,
  arc,
} from "@/lib/chains";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

type WalletRequestError = {
  code?: number;
};

function getEthereumProvider() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return (window as Window & { ethereum?: EthereumProvider }).ethereum;
}

function getWalletErrorCode(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error
    ? (error as WalletRequestError).code
    : undefined;
}

export function ArcTestnetNotice() {
  return (
    <p className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm leading-6 text-cyan-50">
      ArcTipJar currently supports Arc Testnet with real USDC testnet tipping.
    </p>
  );
}

export function AddArcNetworkButton() {
  const chainId = useChainId();
  const [message, setMessage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const isArcTestnet = chainId === ARC_CHAIN_ID;

  async function switchToArcTestnet(ethereum: EthereumProvider) {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARC_CHAIN_ID_HEX }],
    });
  }

  async function addArcTestnetToWallet(ethereum: EthereumProvider) {
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
  }

  async function handleArcTestnetClick() {
    setMessage(null);

    if (isArcTestnet) {
      setMessage("Arc Testnet connected");
      return;
    }

    const ethereum = getEthereumProvider();
    if (!ethereum) {
      setMessage("No wallet detected");
      return;
    }

    setIsAdding(true);

    try {
      await switchToArcTestnet(ethereum);
      setMessage("Arc Testnet ready");
    } catch (error) {
      const errorCode = getWalletErrorCode(error);

      if (errorCode === 4902) {
        try {
          await addArcTestnetToWallet(ethereum);
          await switchToArcTestnet(ethereum);
          setMessage("Arc Testnet ready");
        } catch (addError) {
          setMessage(
            getWalletErrorCode(addError) === 4001
              ? "Request rejected in wallet"
              : "Could not add Arc Testnet",
          );
        }
      } else if (errorCode === 4001) {
        setMessage("Request rejected in wallet");
      } else {
        setMessage("Could not switch to Arc Testnet");
      }
    } finally {
      setIsAdding(false);
    }
  }

  const buttonLabel = isAdding
    ? "Opening wallet..."
    : isArcTestnet
      ? "Arc Testnet connected"
      : "Add Arc Testnet";

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleArcTestnetClick}
        disabled={isAdding}
        className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {buttonLabel}
      </button>
      {message ? <p className="text-xs leading-5 text-amber-100">{message}</p> : null}
      <p className="sr-only">Arc Testnet faucet: {ARC_FAUCET_URL}</p>
    </div>
  );
}
