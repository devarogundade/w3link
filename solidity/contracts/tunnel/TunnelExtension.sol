// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract W3NFT is ERC721, Ownable2Step {
    mapping(uint256 => string) private _tokenURIS;

    address private _parent;

    constructor(
        string memory name_,
        string memory symbol_,
        address parent_
    ) ERC721(name_, symbol_) Ownable2Step() {
        _parent = parent_;
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
}

contract TunnelExtension is IW3LinkApp, Context {
    IW3Link private _w3link;
    IW3LinkConfig private _w3linkConfig;
    address private _tnlContractId;
    uint256 private _tnlChainId;

    mapping(address => address) private _nfts;

    constructor(address w3link_) {
        _w3link = IW3Link(w3link_);
        _w3linkConfig = IW3LinkConfig(_w3link.config());
    }

    function revoke(address nftContractId, uint256 tokenId) external payable {
        W3NFT nft = W3NFT(_nfts[nftContractId]);
        require(nft.ownerOf(tokenId) == _msgSender(), "Not owner");
        nft.burn(tokenId);

        bytes memory data = abi.encode(tokenId, nft.parent(), _msgSender());

        uint256 estFee = _w3linkConfig.fee(_tnlChainId);
        _w3link.deposit{value: estFee}();

        _w3link.dispatch(_tnlContractId, data, _tnlChainId, "" /* no extra */);
    }

    function execute(
        uint256 /* fromChainId */,
        bytes memory data,
        bytes32 /* extra */
    ) external override {
        (
            uint256 tokenId,
            address fromContractId,
            string memory tokenName,
            string memory tokenSymbol,
            string memory tokenURI,
            address holder
        ) = abi.decode(
                data,
                (uint256, address, string, string, string, address)
            );

        if (_nfts[fromContractId] == address(0)) {
            _nfts[fromContractId] = address(
                new W3NFT(tokenName, tokenSymbol, fromContractId)
            );
        }

        W3NFT nft = W3NFT(_nfts[fromContractId]);
        nft.mint(holder, tokenId, tokenURI);
    }

    function onResult(bytes memory data) external override {}
}
