"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAddress, parseUnits, type Address } from "viem";
import { useAccount, useChainId, useConfig, useSwitchChain } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { AddArcNetworkButton } from "@/components/add-arc-network-button";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import {
  ARC_CHAIN_ID,
  ARC_EXPLORER_URL,
  ARCTIPJAR_CONTRACT_ADDRESS,
  ARC_USDC_ADDRESS,
  USDC_DECIMALS,
  arcTipJarAbi,
  erc20Abi,
} from "@/lib/contracts";
import type { TipJarProfile } from "@/lib/profiles";

type TipFormProps = {
  profile: TipJarProfile;
};

const suggestedAmounts = ["1", "5", "10"];

type TipStatus =
  | "idle"
  | "approving"
  | "approve-confirming"
  | "sending"
  | "sent";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "The transaction was rejected or failed.";
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function TipForm({ profile }: TipFormProps) {
  const router = useRouter();
  const config = useConfig();
  const chainId = useChainId();
  const { address, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [amount, setAmount] = useState("5");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<TipStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const contractAddress = ARCTIPJAR_CONTRACT_ADDRESS;
  const creatorAddress = profile.recipientWallet;
  const walletConnected = Boolean(address) || isConnected;
  const isCorrectNetwork = chainId === ARC_CHAIN_ID;
  const isBusy = status !== "idle" && status !== "sent";
  const hasContract = Boolean(contractAddress && isAddress(contractAddress));
  const hasCreator = Boolean(creatorAddress && isAddress(creatorAddress));
  const contractExplorerUrl = `${ARC_EXPLORER_URL}/address/${ARCTIPJAR_CONTRACT_ADDRESS}`;

  const amountInBaseUnits = (() => {
    try {
      return parseUnits(amount || "0", USDC_DECIMALS);
    } catch {
      return BigInt(0);
    }
  })();

  const disabledReason = (() => {
    if (!walletConnected) return "Connect your wallet to send a tip.";
    if (!isCorrectNetwork) return "Switch to Arc Testnet to send a tip.";
    if (!hasContract) return "ArcTipJar contract address is not configured.";
    if (!hasCreator) return "Recipient wallet is not configured for this tip jar.";
    if (amountInBaseUnits <= BigInt(0)) return "Enter an amount greater than 0.";
    if (new TextEncoder().encode(message).length > 280) {
      return "Message must be 280 bytes or less.";
    }
    return null;
  })();

  const statusMessage = (() => {
    if (status === "approving" || status === "approve-confirming") {
      return "Approving USDC...";
    }
    if (status === "sending") {
      return "Sending tip...";
    }
    if (status === "sent") {
      return "Tip sent successfully.";
    }
    if (!walletConnected) {
      return "Connect your wallet to send a tip.";
    }
    if (!isCorrectNetwork) {
      return "Switch to Arc Testnet to send a tip.";
    }
    if (!hasContract) {
      return "ArcTipJar contract address is not configured.";
    }
    if (!hasCreator) {
      return "Recipient wallet is not configured for this tip jar.";
    }
    if (amountInBaseUnits <= BigInt(0)) {
      return "Enter an amount greater than 0.";
    }
    return "Ready to send USDC on Arc Testnet.";
  })();

  async function sendTip() {
    setError(null);

    if (disabledReason) {
      setError(disabledReason);
      return;
    }

    try {
      if (!isCorrectNetwork) {
        await switchChainAsync({ chainId: ARC_CHAIN_ID });
      }

      const spender = contractAddress as Address;
      const creator = creatorAddress as Address;

      setStatus("approving");
      const approveHash = await writeContract(config, {
        address: ARC_USDC_ADDRESS,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, amountInBaseUnits],
        chainId: ARC_CHAIN_ID,
      });

      setStatus("approve-confirming");
      await waitForTransactionReceipt(config, {
        hash: approveHash,
        chainId: ARC_CHAIN_ID,
      });

      setStatus("sending");
      const tipHash = await writeContract(config, {
        address: spender,
        abi: arcTipJarAbi,
        functionName: "tip",
        args: [creator, amountInBaseUnits, message],
        chainId: ARC_CHAIN_ID,
      });

      await waitForTransactionReceipt(config, {
        hash: tipHash,
        chainId: ARC_CHAIN_ID,
      });

      setStatus("sent");
      router.push(`/receipt/${tipHash}`);
    } catch (caughtError) {
      setStatus("idle");
      setError(getErrorMessage(caughtError));
    }
  }

  const buttonLabel =
    status === "approving"
      ? "Approving USDC..."
      : status === "approve-confirming"
        ? "Confirming approval..."
        : status === "sending"
          ? "Sending tip..."
          : status === "sent"
            ? "Tip sent"
            : "Send tip";

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Send a tip</h2>
          <p className="mt-1 text-sm text-slate-400">
            Tip @{profile.username} with Arc Testnet USDC.
          </p>
          <p className="mt-2 text-sm font-medium text-cyan-200">
            USDC tips are live on Arc Testnet.
          </p>
        </div>
        <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          Arc Testnet
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {suggestedAmounts.map((suggestedAmount) => (
          <button
            key={suggestedAmount}
            type="button"
            onClick={() => setAmount(suggestedAmount)}
            className={`rounded-lg border px-3 py-5 text-center transition ${
              amount === suggestedAmount
                ? "border-cyan-300/70 bg-cyan-300/15"
                : "border-white/10 bg-slate-950/80 hover:border-cyan-300/60 hover:bg-cyan-300/10"
            }`}
          >
            <span className="block text-2xl font-bold">{suggestedAmount}</span>
            <span className="text-xs font-medium text-slate-400">USDC</span>
          </button>
        ))}
      </div>

      <label
        className="mt-5 block text-sm font-medium text-slate-200"
        htmlFor="customAmount"
      >
        Custom amount
      </label>
      <input
        id="customAmount"
        name="customAmount"
        inputMode="decimal"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="25"
        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
      />

      <label
        className="mt-5 block text-sm font-medium text-slate-200"
        htmlFor="message"
      >
        Optional message
      </label>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Leave a note for the creator"
        className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70"
      />

      {!walletConnected ? (
        <div className="mt-5">
          <ConnectWalletButton />
        </div>
      ) : !isCorrectNetwork ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => switchChainAsync({ chainId: ARC_CHAIN_ID })}
            className="rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Switch to Arc Testnet
          </button>
          <AddArcNetworkButton />
        </div>
      ) : null}

      <p
        className={`mt-5 rounded-lg border p-3 text-sm ${
          !disabledReason && !isBusy
            ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
            : "border-amber-300/25 bg-amber-300/10 text-amber-100"
        }`}
      >
        {statusMessage}
      </p>

      <button
        type="button"
        onClick={sendTip}
        disabled={Boolean(disabledReason) || isBusy}
        className="mt-5 w-full rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-300/50"
      >
        {buttonLabel}
      </button>

      {error ? (
        <p className="mt-3 rounded-lg border border-red-300/25 bg-red-300/10 p-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <a
        href={contractExplorerUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block rounded-lg border border-white/10 bg-slate-950/70 p-3 text-center text-sm text-cyan-100 transition hover:border-cyan-300/40"
      >
        Contract: {shortenAddress(ARCTIPJAR_CONTRACT_ADDRESS)}
      </a>

      <p className="mt-4 rounded-lg border border-white/10 bg-slate-950/70 p-3 text-center text-sm text-slate-400">
        This flow uses Arc Testnet USDC ERC-20 approval and the ArcTipJar
        contract. Mainnet tipping is not live.
      </p>
    </div>
  );
}
