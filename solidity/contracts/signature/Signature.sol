// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Signature {
    function verifyHash(bytes32 /* hash */) public pure virtual returns (bool) {
        return true;
    }

    function getHash(uint256 dispatchId) public pure virtual returns (bytes32) {
        return bytes32(dispatchId);
    }
}
