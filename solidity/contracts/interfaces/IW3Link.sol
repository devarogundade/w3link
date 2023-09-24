// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IW3Link {
    // send cross-chain message
    function dispatch(
        address destContractId,
        bytes calldata data,
        uint256 destChainId,
        bytes32 extra
    ) external;

    // deposit gas for cross-chain call
    function deposit() external payable;
 
    // withdraw unspent deposited gas
    function withdraw(uint256 amount) external;

    // returns balance of a dapp
    function balance(address contractId) external view returns (uint256);

    // returns W3LinkConfig address
    function config() external view returns (address);
}
