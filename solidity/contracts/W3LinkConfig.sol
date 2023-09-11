// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IW3LinkConfig.sol";

import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract W3LinkConfig is IW3LinkConfig, Ownable2Step {
    address private _handler;
    mapping(uint256 => uint256) private _fees;

    constructor(address handler_) Ownable2Step() {
        _handler = handler_;
    }

    event SetFee(uint256 destChainId, uint256 newFee);

    function fee(uint256 destChainId) external view override returns (uint256) {
        return _fees[destChainId];
    }

    function handler() external view override returns (address) {
        return _handler;
    }

    function verify(bytes32 hash) external view override returns (bool) {
        return true;
    }

    function setFee(uint256 destChainId, uint256 newFee) external onlyOwner {
        _fees[destChainId] = newFee;
        emit SetFee(destChainId, newFee);
    }

    function setHandler(address newHandler) external onlyOwner {
        _handler = newHandler;
    }

    function onlyHandler() external view override {
        require(tx.origin == _handler, "Unauthorized Handler");
    }
}
