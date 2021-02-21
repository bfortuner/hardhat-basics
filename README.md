# Hardhat Hackathon Boilerplate

This repository contains a sample project that you can use as the starting point
for your Ethereum project. It's also a great fit for learning the basics of
smart contract development.

This project is intended to be used with the
[Hardhat Beginners Tutorial](https://hardhat.org/tutorial), but you should be
able to follow it by yourself by reading the README and exploring its
`contracts`, `tests`, `scripts` and `frontend` directories.

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/nomiclabs/hardhat-hackathon-boilerplate.git
cd hardhat-hackathon-boilerplate
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

> Note: There's [an issue in `ganache-core`](https://github.com/trufflesuite/ganache-core/issues/650) that can make the `npm install` step fail. 
>
> If you see `npm ERR! code ENOLOCAL`, try running `npm ci` instead of `npm install`.

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## User Guide

You can find detailed instructions on using this repository and many tips in [its documentation](https://hardhat.org/tutorial).

- [Project description (Token.sol)](https://hardhat.org/tutorial/4-contracts/)
- [Setting up the environment](https://hardhat.org/tutorial/1-setup/)
- [Testing with Hardhat, Mocha and Waffle](https://hardhat.org/tutorial/5-test/)
- [Setting up Metamask](https://hardhat.org/tutorial/8-frontend/#setting-up-metamask)
- [Hardhat's full documentation](https://hardhat.org/getting-started/)

For a complete introduction to Hardhat, refer to [this guide](https://hardhat.org/getting-started/#overview).

## What’s Included?

Your environment will have everything you need to build a Dapp powered by Hardhat and React.

- [Hardhat](https://hardhat.org/): An Ethereum development task runner and testing network.
- [Mocha](https://mochajs.org/): A JavaScript test runner.
- [Chai](https://www.chaijs.com/): A JavaScript assertion library.
- [ethers.js](https://docs.ethers.io/ethers.js/html/): A JavaScript library for interacting with Ethereum.
- [Waffle](https://github.com/EthWorks/Waffle/): To have Ethereum-specific Chai assertions/mathers.
- [A sample frontend/Dapp](./frontend): A Dapp which uses [Create React App](https://github.com/facebook/create-react-app).

## Troubleshooting

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Reset Account`.

## Notes

# View

```bash
# Default HardHat Network
npx hardhat test

# Ganache Network (Make sure your Ganache node isn't running)
npx hardhat --network ganache test

# Spin up the local network
npx hardhat node

# Deploy the contract
npx hardhat run scripts/deploy.js --network [ropsten|localhost]

# Send some money to the contract
npx hardhat --network [ropsten|localhost] faucet <YOUR_METAMASK_ADDRESS>

# For Ropsten, check your contract on Metamask
https://ropsten.etherscan.io/tx/0xcfcfe5bafb8acece04a42a78708dcdf1809c2cfd1a50f878d04232588bbdd8db

# Note the UI hardcodes the network_id / chain_id
ropsten = 3
localhost = 1337
```

```js
let token = await ethers.getContractAt("Token", contractAddress);
await token.owner();
// https://mikemcl.github.io/bignumber.js/
(await token.totalSupply()).toNumber();
(await token.balanceOf("0xe3ab88afc9e121ef423cdd8410a36aeb2e769bef")).toNumber();
```

Kill server if it's stuck
```bash
lsof -i :8545
kill <PID>
```

# Deployment

DANGER: If you push change to `main` branch, and vercel will deploy automatically

* https://vercel.com/bfortuner/hardhat-basics-v3 (web app hosting)
* https://dashboard.alchemyapi.io/apps/1pymw9wwpxs7wdaj (ethereum node relayer)
