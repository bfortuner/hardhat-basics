const { expect } = require("chai");

describe("GameItem ERC721 contract", function () {
  let GameItem;
  let hardhatToken;
  let addr1;
  let addr2;
  let addrs;
  let tokenURI;

  beforeEach(async function () {
    tokenURI = "MY_URI_TO_METADATA.json";
    GameItem = await ethers.getContractFactory("GameItem");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await GameItem.deploy();
    await hardhatToken.deployed();
  });

  describe("awardItem", function () {
    it("Should mint and send item to player", async function () {
        await hardhatToken.awardItem(addr1.address, tokenURI);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);
        expect(await hardhatToken.totalSupply()).to.equal(1);
        expect(await hardhatToken.ownerOf(1)).to.equal(addr1.address);
        expect(await hardhatToken.tokenURI(1)).to.equal(tokenURI);
    });
  });

  describe("safeTransferItem", function () {
    it("Should send user item to new player", async function () {
        await hardhatToken.awardItem(addr1.address, tokenURI);
        await hardhatToken.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
        expect(await hardhatToken.ownerOf(1)).to.equal(addr2.address);
        expect(await hardhatToken.totalSupply()).to.equal(1);
    });
  });

});
