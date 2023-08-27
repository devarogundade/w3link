// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IW3LinkConfig {
    function fee(uint256 destChainId) external view returns (uint256);

    function handler() external view returns (address);

    function verify(bytes calldata data) external view returns (bool);
}