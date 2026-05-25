"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { http, WagmiProvider } from "wagmi";
import { arc } from "@/lib/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const walletConnectProjectIdFallback = "ARC_TIPJAR_DEMO_ONLY";

const config = getDefaultConfig({
  appName: "ArcTipJar",
  appDescription: "Simple USDC tip jars on Arc",
  appUrl: "https://arctipjar.vercel.app",
  projectId: walletConnectProjectId ?? walletConnectProjectIdFallback,
  chains: [arc],
  transports: {
    [arc.id]: http(),
  },
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (!walletConnectProjectId) {
      console.warn(
        "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is missing. ArcTipJar is using a demo fallback; set a real WalletConnect project ID before deploying wallet connection to production.",
      );
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={arc}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
