pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

//import "@openzeppelin/contracts/access/Ownable.sol";
import './LearnToken.sol';

contract Vendor {
  YourToken yourToken;

  constructor(address tokenAddress) public {
    yourToken = YourToken(tokenAddress);
  }

}
