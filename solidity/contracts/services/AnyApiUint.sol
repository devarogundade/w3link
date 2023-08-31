// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract AnyApiUint is ChainlinkClient, Ownable2Step, IW3LinkApp {
    using Chainlink for Chainlink.Request;

    IW3Link private _w3link;
    IW3LinkConfig private _w3linkConfig;

    uint256 private _fee;

    /* requestId --> requestStatus */
    mapping(bytes32 => RequestStatus) public _requests;

    struct RequestStatus {
        uint256 fromChainId;
        address fromContractId;
    }

    event Response(bytes32 indexed requestId, uint256 data);

    constructor(address w3link_, address oracle_) Ownable2Step() {
        _w3link = IW3Link(w3link_);
        _w3linkConfig = IW3LinkConfig(_w3link.config());

        setChainlinkOracle(oracle_);
        _fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    function execute(
        uint256 fromChainId,
        bytes memory data,
        bytes32 extra /* jobId */
    ) external override {
        _w3linkConfig.onlyHandler();
        
        (
            string memory url,
            string memory path,
            address fromContractId,
            int256 times
        ) = abi.decode(data, (string, string, address, int256));

        Chainlink.Request memory req = buildChainlinkRequest(
            extra,
            address(this),
            this.response.selector
        );

        req.add("get", url);
        req.add("path", path);
        req.addInt("times", times);

        bytes32 requestId = sendChainlinkRequest(req, _fee);

        _requests[requestId] = RequestStatus({
            fromChainId: fromChainId,
            fromContractId: fromContractId
        });
    }

    /* Receive the response in the form of uint256 */
    function response(
        bytes32 _requestId,
        uint256 _data
    ) public recordChainlinkFulfillment(_requestId) {
        RequestStatus storage request = _requests[_requestId];

        uint256 estFee = _w3linkConfig.fee(request.fromChainId);
        _w3link.deposit{value: estFee}();

        _w3link.dispatch(
            request.fromContractId,
            abi.encode(_data),
            request.fromChainId,
            "" /* no extra */
        );

        emit Response(_requestId, _data);
    }

    function onResult(bytes memory data) external override {}
}
