// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./../services/AnyApiUintExtension.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract W3LinkUintApi is AnyApiUintExtension {
    function onResponse(uint256 data) internal virtual override {
        /* Put your code here */
    }
}
