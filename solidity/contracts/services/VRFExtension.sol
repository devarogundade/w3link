// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details

abstract contract VRFExtension is IW3LinkApp {
    IW3Link private _w3link;
    IW3LinkConfig private _w3linkConfig;
    address private _vrfContractId;
    uint256 private _vrfChainId;

    bytes32 immutable _keyHash;
    uint64 private _subcriptionId;
    uint16 private _confirmations;

    /* Fee is use to balance link token fee */
    uint256 private _vrfFee = 1 * 10 ** 15;

    event SetFee(uint256 newFee);
    event Generate();

    constructor(
        bytes32 keyHash_,
        uint64 subcriptionId_,
        uint16 confirmations_
    ) {
        /* Fantom W3Link Contract */
        _w3link = IW3Link(0xC8709A2ab8CfDb387b8AC71c6083141c16d805C8);
        _w3linkConfig = IW3LinkConfig(_w3link.config());
        /* Fantom VRF Contract */
        _vrfContractId = 0xC8709A2ab8CfDb387b8AC71c6083141c16d805C8;
        /* Fantom Chain Id */
        _vrfChainId = 4002;
        _keyHash = keyHash_;
        _subcriptionId = subcriptionId_;
        _confirmations = confirmations_;
    }

    function generate() external payable {
        uint256 estFee = _w3linkConfig.fee(_vrfChainId);
        require(msg.value >= (estFee + _vrfFee), "Use totalFee() to est. fee");

        bytes memory data = abi.encode(_subcriptionId, _confirmations);

        _w3link.deposit{value: estFee}();

        _w3link.dispatch(_vrfContractId, data, _vrfChainId, _keyHash);

        emit Generate();
    }

    function totalFee() external view returns (uint256) {
        uint256 estFee = _w3linkConfig.fee(_vrfChainId);
        return (estFee + _vrfFee);
    }

    function setFee(uint256 newFee) external {
        _vrfFee = newFee;
        emit SetFee(newFee);
    }

    function execute(
        uint256 /* fromChainId */,
        bytes memory data,
        bytes32 /* extra */
    ) external override {
        onRandomWords(abi.decode(data, (uint256[])));
    }

    function onRandomWords(uint256[] memory randomWords) internal virtual;

    function onResult(bytes memory data) external override {}
}
