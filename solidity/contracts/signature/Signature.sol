// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Signature {
    // @todo
    function verifyHash(bytes32 hash) public pure returns (bool) {
        return true;
    }
    
    // @todo
    function getHash(uint256 dispatchId) public pure returns (bytes32) {
        return bytes32(dispatchId);
    }
}
