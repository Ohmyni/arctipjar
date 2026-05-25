import hre from "hardhat";

async function main() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is missing. Add it to .env before deploying.");
  }

  const usdcAddress =
    process.env.NEXT_PUBLIC_ARC_USDC_ADDRESS ??
    "0x3600000000000000000000000000000000000000";
  const [deployer] = await hre.ethers.getSigners();

  if (!deployer) {
    throw new Error("No deployer signer found. Check PRIVATE_KEY in .env.");
  }

  console.log(`Deploying ArcTipJar with: ${deployer.address}`);

  const ArcTipJar = await hre.ethers.getContractFactory("ArcTipJar", deployer);
  const arcTipJar = await ArcTipJar.deploy(usdcAddress);

  await arcTipJar.waitForDeployment();

  console.log(`ArcTipJar deployed to: ${await arcTipJar.getAddress()}`);
  console.log(`USDC interface: ${usdcAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
