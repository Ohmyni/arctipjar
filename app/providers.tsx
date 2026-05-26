"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { http, WagmiProvider } from "wagmi";
import { ARC_RPC_URL, arc } from "@/lib/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const walletConnectProjectIdFallback = "00000000000000000000000000000000";
const isProductionCiBuild =
  process.env.NODE_ENV === "production" && process.env.CI === "true";

if (!walletConnectProjectId && isProductionCiBuild) {
  throw new Error(
    "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for production wallet connection.",
  );
}

const config = getDefaultConfig({
  appName: "ArcTipJar",
  appDescription: "Simple USDC tip jars on Arc",
  appUrl: "https://arctipjar.vercel.app",
  projectId: walletConnectProjectId ?? walletConnectProjectIdFallback,
  chains: [arc],
  walletConnectParameters: {
    metadata: {
      name: "ArcTipJar",
      description: "Simple USDC tip jars on Arc",
      url: "https://arctipjar.vercel.app",
      icons: ["https://arctipjar.vercel.app/favicon.ico"],
    },
  },
  transports: {
    [arc.id]: http(ARC_RPC_URL),
  },
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (!walletConnectProjectId) {
      console.warn(
        "WalletConnect project ID is missing. Mobile wallet connection may not work.",
      );
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={arc} locale="en-US">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
