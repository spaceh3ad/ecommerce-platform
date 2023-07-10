import { ethers } from "hardhat";
import { OrderManager__factory } from "../typechain-types";

/**
 * @dev Main function to deploy the OrderManager contract.
 * It deploys the contract using the `OrderManager__factory` and logs the deployed contract address.
 * This function is an entry point for deploying the contract using Hardhat.
 */
async function main() {
  // Get the deployer's signer
  const [deployer] = await ethers.getSigners();

  // Deploy the OrderManager contract
  let orderManager = await new OrderManager__factory().deploy();

  // Log the deployed contract address
  console.log("OrderManager deployed to:", orderManager.address);
}

// Call the main function and handle any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
