import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-ethers";

const arcTestnetRpcUrl =
  process.env.ARC_TESTNET_RPC_URL || "https://rpc.testnet.arc.network";

function getPrivateKey() {
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    return undefined;
  }

  return privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
}

const privateKey = getPrivateKey();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    arcTestnet: {
      url: arcTestnetRpcUrl,
      chainId: 5042002,
      accounts: privateKey ? [privateKey] : [],
    },
  },
};

export default config;
