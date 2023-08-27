// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./../services/VRFExtension.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract W3LinkVRF is VRFExtension {
    constructor()
        VRFExtension(
            0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15 /* keyHash */,
            1 /* subcriptionId */,
            3 /* confirmations */
        )
    {}

    function onRandomWords(
        uint256[] memory randomWords
    ) internal virtual override {
        /* Put your code here */
    }
}
