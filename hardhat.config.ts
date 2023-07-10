import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@primitivefi/hardhat-dodoc';

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  dodoc: {
    runOnCompile: true,
    debugMode: true,
  },
};

export default config;
