# ArcTipJar

ArcTipJar is a USDC tip jar app live on Arc Testnet. It lets creators,
builders, and communities create public tip jar profiles and receive USDC
testnet tips through a simple public jar page.

- Live demo: https://arctipjar.vercel.app
- Network: Arc Testnet
- Explorer: https://testnet.arcscan.app
- Contract: `0xB65396797aeC75F7B4a0e2661af16319f8D8FfF9`
- USDC interface: `0x3600000000000000000000000000000000000000`

## Grant Summary

ArcTipJar is a USDC tip jar platform live on Arc Testnet. It lets creators,
builders, and communities receive USDC testnet tips through a simple public jar
page. The app supports wallet connection, Arc Testnet network setup, smart
contract-based tipping, ArcScan receipts, and a dashboard that reads onchain
TipSent events. Creator profile creation is backed by Supabase, and the payment
flow is onchain on Arc Testnet.

## Features

- Wallet connection with RainbowKit and wagmi
- Arc Testnet network setup button
- Real USDC testnet tipping through a deployed smart contract
- ERC-20 USDC approval followed by `ArcTipJar.tip(...)`
- Creator profile creation with Supabase
- Public jar pages that tip the creator's saved recipient wallet
- Receipts that link to ArcScan transaction pages
- Dashboard that reads `TipSent` events from Arc Testnet

## Current Limitations

- There is no auth or profile editing yet.
- Dashboard events are global for now, not creator-specific.
- The app supports Arc Testnet only. It does not claim mainnet support.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env` and fill in values as needed:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_EXPLORER_URL=https://testnet.arcscan.app
NEXT_PUBLIC_ARC_USDC_ADDRESS=0x3600000000000000000000000000000000000000
NEXT_PUBLIC_ARCTIPJAR_CONTRACT_ADDRESS=0xB65396797aeC75F7B4a0e2661af16319f8D8FfF9
NEXT_PUBLIC_DEMO_CREATOR_ADDRESS=0x52F0EbD6A19264942dDcC17C7059f440d6fb7AFa
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ARC_TESTNET_RPC_URL=https://rpc.testnet.arc.network
PRIVATE_KEY=
```

## Supabase

Run `supabase/schema.sql` in your Supabase SQL editor. The MVP enables public
profile reads and public profile inserts so creators can create a jar without
auth. Wallet-based ownership and profile editing are planned next.

## Contract

Compile:

```bash
npx hardhat compile
```

Deploy to Arc Testnet:

```bash
npx hardhat run scripts/deploy.ts --network arcTestnet
```

Deployment is manual. The app does not deploy contracts automatically.
