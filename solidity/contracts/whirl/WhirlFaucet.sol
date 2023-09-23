// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract WhirlFaucet is ERC721, Ownable2Step {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;

    mapping(uint256 => string) public _tokenURIS;

    event NFTMinted(
        address indexed owner,
        address tokenAddress,
        string tokenUri,
        uint256 tokenId
    );

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) Ownable2Step() {}

    function getFreeNft(string memory uri) external {
        _tokenId.increment();

        _mint(_msgSender(), _tokenId.current());
        _tokenURIS[_tokenId.current()] = uri;

        emit NFTMinted(_msgSender(), address(this), uri, _tokenId.current());
    }
}
