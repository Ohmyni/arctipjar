"use client";

import { useEffect, useState } from "react";
import { createPublicClient, formatUnits, http, parseAbiItem } from "viem";
import { arc } from "@/lib/chains";
import {
  ARC_EXPLORER_URL,
  ARC_RPC_URL,
  ARCTIPJAR_CONTRACT_ADDRESS,
  USDC_DECIMALS,
} from "@/lib/contracts";

const tipSentEvent = parseAbiItem(
  "event TipSent(address indexed sender, address indexed creator, uint256 amount, string message, uint256 timestamp)",
);

const publicClient = createPublicClient({
  chain: arc,
  transport: http(ARC_RPC_URL),
});

type TipEvent = {
  sender: string;
  creator: string;
  amount: bigint;
  message: string;
  timestamp: bigint;
  txHash: string;
};

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatUsdc(amount: bigint) {
  const formatted = formatUnits(amount, USDC_DECIMALS);
  return `${Number(formatted).toLocaleString(undefined, {
    maximumFractionDigits: 6,
  })} USDC`;
}

export function DashboardEvents() {
  const [events, setEvents] = useState<TipEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      setIsLoading(true);
      setError(null);

      try {
        const blockNumber = await publicClient.getBlockNumber();
        const recentWindow = BigInt(50000);
        const fromBlock =
          blockNumber > recentWindow ? blockNumber - recentWindow : BigInt(0);
        const logs = await publicClient.getLogs({
          address: ARCTIPJAR_CONTRACT_ADDRESS,
          event: tipSentEvent,
          fromBlock,
          toBlock: "latest",
        });

        if (!isMounted) return;

        setEvents(
          logs
            .map((log) => ({
              sender: log.args.sender ?? "",
              creator: log.args.creator ?? "",
              amount: log.args.amount ?? BigInt(0),
              message: log.args.message ?? "",
              timestamp: log.args.timestamp ?? BigInt(0),
              txHash: log.transactionHash,
            }))
            .filter((event) => event.sender && event.creator)
            .reverse(),
        );
      } catch (caughtError) {
        if (!isMounted) return;

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Could not load Arc Testnet tip events.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalReceived = events.reduce(
    (total, event) => total + event.amount,
    BigInt(0),
  );
  const supporterCount = new Set(
    events.map((event) => event.sender.toLowerCase()),
  ).size;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
          <p className="text-sm text-slate-400">Total received</p>
          <p className="mt-3 text-3xl font-bold">{formatUsdc(totalReceived)}</p>
          <p className="mt-2 text-xs font-medium text-cyan-200">
            From TipSent events
          </p>
        </section>
        <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
          <p className="text-sm text-slate-400">Total tips</p>
          <p className="mt-3 text-3xl font-bold">{events.length}</p>
          <p className="mt-2 text-xs font-medium text-cyan-200">
            Recent Arc Testnet logs
          </p>
        </section>
        <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
          <p className="text-sm text-slate-400">Recent supporters</p>
          <p className="mt-3 text-3xl font-bold">{supporterCount}</p>
          <p className="mt-2 text-xs font-medium text-cyan-200">
            Unique senders
          </p>
        </section>
      </div>

      <section className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.06]">
        <div className="flex flex-col gap-2 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent tips</h2>
            <p className="mt-1 text-sm text-slate-400">
              Live TipSent events from Arc Testnet.
            </p>
          </div>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
            Onchain
          </span>
        </div>

        {isLoading ? (
          <div className="px-5 py-16 text-center text-slate-400">
            Loading Arc Testnet events...
          </div>
        ) : error ? (
          <div className="px-5 py-16 text-center">
            <p className="text-lg font-semibold text-white">
              Could not load events
            </p>
            <p className="mt-2 text-sm text-slate-400">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-lg font-semibold text-white">No tips yet</p>
            <p className="mt-2 text-slate-400">
              TipSent events from Arc Testnet will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-950/70 text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-medium">Sender</th>
                  <th className="px-5 py-4 font-medium">Creator</th>
                  <th className="px-5 py-4 font-medium">Amount</th>
                  <th className="px-5 py-4 font-medium">Message</th>
                  <th className="px-5 py-4 font-medium">Tx hash</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.txHash} className="border-t border-white/10">
                    <td className="px-5 py-4 font-mono text-cyan-100">
                      {shortenAddress(event.sender)}
                    </td>
                    <td className="px-5 py-4 font-mono text-cyan-100">
                      {shortenAddress(event.creator)}
                    </td>
                    <td className="px-5 py-4 font-semibold">
                      {formatUsdc(event.amount)}
                    </td>
                    <td className="max-w-xs px-5 py-4 text-slate-300">
                      {event.message || "-"}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`${ARC_EXPLORER_URL}/tx/${event.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-cyan-100 hover:text-cyan-200"
                      >
                        {shortenAddress(event.txHash)}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
