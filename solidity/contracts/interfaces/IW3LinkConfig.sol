// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IW3LinkConfig {
    function fee(uint256 destChainId) external view returns (uint256);

    function handler() external view returns (address);

    function onlyHandler() external;

    function stringToBytes32(
        string memory source
    ) external pure returns (bytes32 result);
}
