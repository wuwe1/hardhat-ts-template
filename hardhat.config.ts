import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

const { ALCHEMY_API_KEY } = process.env;

if (!ALCHEMY_API_KEY)
  throw new Error(
    `ALCHEMY_API_KEY env var not set. Copy .env.template to .env and set the env var`
  );

// const accounts = [`0x${process.env.PRIVATE_KEY}`];
const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
  // accountsBalance: "990000000000000000000",
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.3" }],
  },
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_API_KEY,
        enabled: process.env.FORKING === "true",
        // blockNumber:
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      accounts,
      chainId: 56,
    },
    localhost: {},
  },
};

export default config;
