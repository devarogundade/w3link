// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract VRF is VRFConsumerBaseV2, IW3LinkApp {
    IW3Link private _w3link;
    IW3LinkConfig private _w3linkConfig;

    // whether the request has been successfully fulfilled
    // whether a requestId exists
    struct RequestStatus {
        bool fulfilled;
        bool exists;
        uint256[] randomWords;
        uint256 fromChainId;
        address fromContractId;
    }

    /* requestId --> requestStatus */
    mapping(uint256 => RequestStatus) public _requests;

    VRFCoordinatorV2Interface _cordinator;

    uint32 private _gasLimit = 150000;
    uint32 private _numWords = 1;

    event RequestSent(uint256 requestId, uint32 _numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    constructor(address w3link_, address vrf_) VRFConsumerBaseV2(vrf_) {
        _w3link = IW3Link(w3link_);
        _w3linkConfig = IW3LinkConfig(_w3link.config());

        _cordinator = VRFCoordinatorV2Interface(vrf_);
    }

    receive() external payable {}

    function execute(
        uint256 fromChainId,
        bytes memory data,
        bytes32 extra
    ) external override {
        _w3linkConfig.onlyHandler();
        
        address fromContractId = abi.decode(data, (address));

        (uint64 subcriptionId, uint16 confirmations) = abi.decode(
            data,
            (uint64, uint16)
        );

        uint256 requestId = _cordinator.requestRandomWords(
            extra /* keyHash */,
            subcriptionId,
            confirmations,
            _gasLimit,
            _numWords
        );

        _requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false,
            fromChainId: fromChainId,
            fromContractId: fromContractId
        });

        emit RequestSent(requestId, _numWords);
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        RequestStatus storage request = _requests[_requestId];

        require(request.exists, "request not found");
        request.fulfilled = true;

        uint256 estFee = _w3linkConfig.fee(request.fromChainId);
        _w3link.deposit{value: estFee}();

        _w3link.dispatch(
            request.fromContractId,
            abi.encode(_randomWords),
            request.fromChainId,
            "" /* extra */
        );

        emit RequestFulfilled(_requestId, _randomWords);
    }

    // to check the request status of random number call.
    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(_requests[_requestId].exists, "request not found");
        RequestStatus memory request = _requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    function onResult(bytes memory data) external override {}
}
