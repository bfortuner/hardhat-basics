//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// We import this library to be able to use console.log
import "hardhat/console.sol";

contract ArcadeToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Arcade Token", "ARCADE") {
        _mint(msg.sender, initialSupply);
    }
}
