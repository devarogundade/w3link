// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract WhirlFaucet is ERC721, Ownable2Step {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;
    mapping(address => bool) private _minted;

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
        require(_minted[_msgSender()] == false, "You cant mint more");
        _tokenId.increment();
        uint256 tokenId = _tokenId.current();

        _mint(_msgSender(), tokenId);
        _tokenURIS[tokenId] = uri;

        _minted[_msgSender()] = true;

        emit NFTMinted(_msgSender(), address(this), uri, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return _tokenURIS[tokenId];
    }
}
