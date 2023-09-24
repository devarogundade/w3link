// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IW3LinkApp {
    // entrypoint to receive cross-chain message
    function execute(
        uint256 fromChainId,
        bytes calldata data,
        bytes32 extra
    ) external;

    // on call cross-chain call successful
    function onResult(bytes calldata data) external;
}