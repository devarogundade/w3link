// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IW3LinkConfig {
    // estimated bridging fee
    function fee(uint256 destChainId) external view returns (uint256);

    // address of cross-chain signer
    function handler() external view returns (address);

    // modifier
    function onlyHandler() external;

    // utils
    function stringToBytes32(
        string memory source
    ) external pure returns (bytes32 result);
}
