// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract whirlFaucet is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;
    mapping(uint256 => string) private _tokenURIS;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {}

    function mint(string memory uri) external {
        _tokenId.increment();

        _mint(_msgSender(), _tokenId.current());
        _tokenURIS[_tokenId.current()] = uri;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return _tokenURIS[tokenId];
    }
}
