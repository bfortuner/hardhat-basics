async function main() {
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const GameItem = await ethers.getContractFactory("GameItem");

    const token = await GameItem.deploy();
    await token.deployed();

    let tokenURI = "https://gateway.pinata.cloud/ipfs/QmdUEtnLR8jiqrqhAmXmBcmMWemvFTPbvv6BqRM1uJ4VNY/shield1_metadata.json";
    await token.awardItem(deployer.address, tokenURI);

    // Brendan
    await token.awardItem("0x40CCE59FF58459F2e6026f66326BB579f5600B94", tokenURI);

    // Colin
    await token.awardItem("0x0ebb71385ef9490ebfd3baa127688df1e4947b03", tokenURI);
  
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
      contractsDir + "/game-item-contract-address.json",
      JSON.stringify({ GameItem: token.address }, undefined, 2)
    );
  
    const TokenArtifact = artifacts.readArtifactSync("GameItem");
  
    fs.writeFileSync(
      contractsDir + "/GameItem.json",
      JSON.stringify(TokenArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  