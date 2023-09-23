// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract W3NFT is ERC721, Ownable2Step {
    mapping(uint256 => string) private _tokenURIS;

    address private _parent;
    uint256 private _parentId;

    constructor(
        string memory name_,
        string memory symbol_,
        address parent_,
        uint256 parentId_
    ) ERC721(name_, symbol_) Ownable2Step() {
        _parent = parent_;
        _parentId = parentId_;
    }

    function mint(
        address to,
        uint256 tokenId,
        string memory uri
    ) external onlyOwner {
        _mint(to, tokenId);
        _tokenURIS[tokenId] = uri;
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return _tokenURIS[tokenId];
    }

    function parent() external view returns (address) {
        return _parent;
    }

    function parentId() external view returns (uint256) {
        return _parentId;
    }
}
