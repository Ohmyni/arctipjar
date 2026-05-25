"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectWalletButton() {
  return (
    <div className="wallet-connect-button">
      <ConnectButton
        accountStatus={{
          largeScreen: "full",
          smallScreen: "address",
        }}
        chainStatus={{
          largeScreen: "name",
          smallScreen: "icon",
        }}
        label="Connect Wallet"
        showBalance={false}
      />
    </div>
  );
}
