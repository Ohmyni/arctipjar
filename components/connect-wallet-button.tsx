"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectWalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        let label = "Connect Wallet";
        let onClick = openConnectModal;

        if (connected && chain.unsupported) {
          label = "Wrong Network";
          onClick = openChainModal;
        } else if (connected) {
          label = account.displayName;
          onClick = openAccountModal;
        }

        return (
          <button
            type="button"
            onClick={onClick}
            disabled={!ready}
            className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {label}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
