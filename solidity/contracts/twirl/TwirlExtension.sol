// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

import "./W3NFT.sol";

import "@openzeppelin/contracts/utils/Context.sol";

contract whirlExtension is IW3LinkApp, Context {
    IW3Link private _w3link;
    IW3LinkConfig private _w3linkConfig;
    mapping(uint256 => address) private _twlContractIds;

    mapping(address => address) private _nfts;

    constructor(address w3link_) {
        _w3link = IW3Link(w3link_);
        _w3linkConfig = IW3LinkConfig(_w3link.config());
    }

    /// @dev For setting whirl contract ids
    function setTwlContract(uint256 destChainId, address contractId) external {
        _twlContractIds[destChainId] = contractId;
    }

    /// @dev This functions tell whirl Contract that the minted NFT was burn
    /// and it should unlock the original NFT
    function revoke(address nftContractId, uint256 tokenId) external payable {
        W3NFT nft = W3NFT(_nfts[nftContractId]);
        require(nft.ownerOf(tokenId) == _msgSender(), "Not owner");
        nft.burn(tokenId);

        // Encode data for whirl Contract
        bytes memory data = abi.encode(tokenId, nft.parent(), _msgSender());

        uint256 estFee = _w3linkConfig.fee(nft.parentId());
        _w3link.deposit{value: estFee}();

        // Send message to whirl Contract
        _w3link.dispatch(
            _twlContractIds[nft.parentId()],
            data,
            nft.parentId(),
            "" /* no extra */
        );
    }

    /// @dev This function will mint a new similar NFT as locked on whirl Contract
    function execute(
        uint256 fromChainId,
        bytes memory data,
        bytes32 /* extra */
    ) external override {
        _w3linkConfig.onlyHandler();

        // Decode data from whirl Contract
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

        // Checks if NFT contract as already been created
        // otherwise create it
        if (_nfts[fromContractId] == address(0)) {
            _nfts[fromContractId] = address(
                new W3NFT(tokenName, tokenSymbol, fromContractId, fromChainId)
            );
        }

        // Mint the NFT
        W3NFT nft = W3NFT(_nfts[fromContractId]);
        nft.mint(holder, tokenId, tokenURI);
    }

    function onResult(bytes memory data) external override {}
}
