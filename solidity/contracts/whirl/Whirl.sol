// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "@openzeppelin/contracts/utils/Context.sol";

contract Whirl is IW3LinkApp, Context {
    IW3Link private _w3link;
    IW3LinkConfig private _w3linkConfig;
    mapping(uint256 => address) private _extContractIds;

    event NFTransferred(
        address tokenAddress,
        uint256 tokenId,
        address from,
        address to
    );

    constructor(address w3link_) {
        _w3link = IW3Link(w3link_);
        _w3linkConfig = IW3LinkConfig(_w3link.config());
    }

    /// @dev For getting briging fee
    function estimateFee(uint256 destChainId) external view returns (uint256) {
        return _w3linkConfig.fee(destChainId);
    }

    /// @dev For setting extension contract ids
    function setExtContract(uint256 destChainId, address contractId) external {
        _extContractIds[destChainId] = contractId;
    }

    /// @dev This function locks the Original NFT
    /// and tell whirlExtension Contract to mint a new similar NFT
    function bridge(
        uint256 destChainId,
        uint256 tokenId,
        address nftContractId
    ) external {
        IERC721 nft = IERC721(nftContractId);
        IERC721Metadata metadata = IERC721Metadata(nftContractId);

        nft.transferFrom(_msgSender(), address(this), tokenId);

        // Encode data for whirlExtension Contract
        bytes memory data = abi.encode(
            tokenId,
            nftContractId,
            metadata.name(),
            metadata.symbol(),
            metadata.tokenURI(tokenId),
            _msgSender()
        );

        uint256 estFee = _w3linkConfig.fee(destChainId);
        _w3link.deposit{value: estFee}();

        // Send message to whirlExtension Contract
        _w3link.dispatch(
            _extContractIds[destChainId],
            data,
            destChainId,
            "" /* no extra */
        );

        emit NFTransferred(nftContractId, tokenId, _msgSender(), address(this));
    }

    /// @dev This function unlocks the Original NFT to the
    /// owner of the burnt similar NFT on whirlExtension
    function execute(
        uint256 /* fromChainId */,
        bytes memory data,
        bytes32 /* extra */
    ) external override {
        _w3linkConfig.onlyHandler();

        // Decode data from whirlExtension Contract
        (address holder, address nftContractId, uint256 tokenId) = abi.decode(
            data,
            (address, address, uint256)
        );

        // Unlock NFT to owner
        IERC721 nft = IERC721(nftContractId);
        nft.transferFrom(address(this), holder, tokenId);

        emit NFTransferred(nftContractId, tokenId, address(this), _msgSender());
    }

    function onResult(bytes memory data) external override {}
}
