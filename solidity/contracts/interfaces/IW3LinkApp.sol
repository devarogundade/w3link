// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IW3LinkApp {
    function execute(
        uint256 fromChainId,
        bytes calldata data,
        bytes32 extra
    ) external;

    function onResult(bytes calldata data) external;
}