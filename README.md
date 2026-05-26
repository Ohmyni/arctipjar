# ArcTipJar

ArcTipJar is a USDC tip jar platform live on Arc Testnet. Creators, builders,
and communities can create a public jar profile, set the wallet that receives
tips, and share a simple link with supporters.

- Live demo: https://arctipjar.vercel.app
- Network: Arc Testnet
- Explorer: https://testnet.arcscan.app
- ArcTipJar contract: `0xB65396797aeC75F7B4a0e2661af16319f8D8FfF9`
- USDC ERC-20 interface: `0x3600000000000000000000000000000000000000`

## Grant Summary

ArcTipJar brings a creator-friendly USDC tipping flow to Arc Testnet. The app
supports RainbowKit wallet connection, Arc Testnet network setup, Supabase
creator profiles, smart contract-based tipping, ArcScan receipts, and an
onchain dashboard that reads `TipSent` events from the deployed ArcTipJar
contract. The smart contract can tip any creator wallet, and public jar pages use
the creator recipient wallet saved in Supabase.

## What Works Today

- Create a public creator profile with Supabase-backed storage.
- Save a username, display name, bio, social link, and recipient wallet.
- Open a public jar at `/{username}`.
- Connect a wallet with RainbowKit and wagmi.
- Add or switch to Arc Testnet.
- Approve Arc Testnet USDC through the ERC-20 interface.
- Send a tip through the deployed `ArcTipJar` contract.
- Redirect supporters to an ArcScan-linked receipt.
- Read recent onchain `TipSent` events in the dashboard.

## Architecture

- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Wallet stack: RainbowKit, wagmi, viem
- Profile storage: Supabase `profiles` table
- Network: Arc Testnet only
- Token flow: Arc USDC ERC-20 interface approval, then `ArcTipJar.tip(...)`
- Receipts: ArcScan transaction links

## Contract

The deployed contract accepts a creator address, amount, and optional message.
It transfers USDC from the supporter to the creator with `transferFrom` and
emits:

```solidity
event TipSent(
  address indexed sender,
  address indexed creator,
  uint256 amount,
  string message,
  uint256 timestamp
);
```

## Current Limitations

- ArcTipJar is Arc Testnet only. Mainnet support is not enabled.
- Profile creation is public for the MVP; auth and profile editing are not yet
  implemented.
- The dashboard currently shows global contract activity. Creator-specific
  dashboards will follow wallet-based profile ownership.

## Roadmap

- Wallet-based creator ownership for profile edits.
- Creator-specific dashboard filtering.
- Public profile management and verification.
- Better supporter history and receipt metadata.
- Production hardening for rate limits, validation, and abuse prevention.
- Mainnet readiness after Arc mainnet requirements are finalized.

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

Run `supabase/schema.sql` in the Supabase SQL editor. The MVP enables public
profile reads and public profile inserts so creators can create jars without an
account. Auth and profile editing are planned next.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Compile contracts:

```bash
npx hardhat compile
```

Deploy manually to Arc Testnet:

```bash
npx hardhat run scripts/deploy.ts --network arcTestnet
```
