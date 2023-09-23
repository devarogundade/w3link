// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./W3NFT.sol";

contract WhirlFaucet is W3NFT {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;

    event NFTMinted(
        address indexed owner,
        address tokenAddress,
        string tokenUri,
        uint256 tokenId
    );

    constructor(
        string memory name_,
        string memory symbol_
    ) W3NFT(name_, symbol_, address(0), 0) {}

    function getFreeNft(string memory uri) external {
        _tokenId.increment();

        _mint(msg.sender, _tokenId.current());
        _tokenURIS[_tokenId.current()] = uri;

        emit NFTMinted(msg.sender, address(this), uri, _tokenId.current());
    }
}
