// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    // ethers is avaialble in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const ArcadeToken = await ethers.getContractFactory("ArcadeToken");

    // Pass in constructor arguments to deploy()
    const totalSupply = 1000;
    const token = await ArcadeToken.deploy(totalSupply);
    await token.deployed();
  
    console.log("Token address:", token.address);
  
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(token);
  }
  
  function saveFrontendFiles(token) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + "/arcade-token-contract-address.json",
      JSON.stringify({ ArcadeToken: token.address }, undefined, 2)
    );
  
    const TokenArtifact = artifacts.readArtifactSync("ArcadeToken");
  
    fs.writeFileSync(
      contractsDir + "/ArcadeToken.json",
      JSON.stringify(TokenArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  