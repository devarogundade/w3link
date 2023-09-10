// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

import "./W3NFT.sol";

import "@openzeppelin/contracts/utils/Context.sol";

contract TwirlExtension is IW3LinkApp, Context {
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
        _w3linkConfig.onlyHandler();

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
