// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./../interfaces/IW3Link.sol";
import "./../interfaces/IW3LinkApp.sol";
import "./../interfaces/IW3LinkConfig.sol";

abstract contract AnyApiUintExtension is IW3LinkApp {
    IW3Link private _w3link;
    IW3LinkConfig private _w3linkConfig;
    address private _apiContractId;
    uint256 private _apiChainId;

    /* Fee is use to balance link token fee */
    uint256 private _apiFee = 2 * 10 ** 15;

    event SetFee(uint256 newFee);
    event Fetch();

    function fetch(
        string memory url,
        string memory path,
        int256 times
    ) external payable {
        uint256 estFee = _w3linkConfig.fee(_apiChainId);
        require(msg.value >= (estFee + _apiFee), "Use totalFee() to est. fee");

        bytes memory data = abi.encode(url, path, address(this), times);

        _w3link.deposit{value: estFee}();

        _w3link.dispatch(_apiContractId, data, _apiChainId, "" /* no extra */);

        emit Fetch();
    }

    function totalFee() external view returns (uint256) {
        uint256 estFee = _w3linkConfig.fee(_apiChainId);
        return (estFee + _apiFee);
    }

    function setFee(uint256 newFee) external {
        _apiFee = newFee;
        emit SetFee(newFee);
    }

    function execute(
        uint256 /* fromChainId */,
        bytes memory data,
        bytes32 /* extra */
    ) external override {
        onResponse(abi.decode(data, (uint256)));
    }

    function onResponse(uint256 data) internal virtual;

    function onResult(bytes memory data) external override {}
}
