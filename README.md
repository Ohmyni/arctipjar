# ArcTipJar

ArcTipJar is a USDC tip jar app live on Arc Testnet. It lets creators,
builders, and communities receive USDC testnet tips through a simple public jar
page.

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
TipSent events. Profile creation is currently demo-only, while the payment flow
is already onchain on Arc Testnet.

## Features

- Wallet connection with RainbowKit and wagmi
- Arc Testnet network setup button
- Real USDC testnet tipping through a deployed smart contract
- ERC-20 USDC approval followed by `ArcTipJar.tip(...)`
- Receipts that link to ArcScan transaction pages
- Dashboard that reads `TipSent` events from Arc Testnet

## Current Limitations

- Profile creation is demo-only and does not save to a database yet.
- The app supports Arc Testnet only. It does not claim mainnet support.
- Supabase/user persistence has not been added yet.

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
ARC_TESTNET_RPC_URL=https://rpc.testnet.arc.network
PRIVATE_KEY=
```

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
