// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IW3Link {
    function dispatch(
        address destContractId,
        bytes calldata data,
        uint256 destChainId,
        bytes32 extra
    ) external;

    function deposit() external payable;

    function withdraw(uint256 amount) external;

    function balance(address contractId) external view returns (uint256);

    function config() external view returns (address);
}
