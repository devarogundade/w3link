// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IW3Link.sol";
import "./interfaces/IW3LinkApp.sol";
import "./interfaces/IW3LinkConfig.sol";
import "./signature/Signature.sol";

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract W3Link is IW3Link, Ownable2Step, Signature {    
    using Counters for Counters.Counter;
    
    address private _config;
    uint256 public immutable _chainId;

    Counters.Counter private _dispatchId;

    mapping(bytes32 => bool) private _executed;

    struct Gas {
        uint256 value;
    }

    mapping(address => Gas) private _gasContents;

    event SetConfig(address newConfig);
    event Dispatch(
        bytes32 hash,
        address destContractId,
        address fromContractId,
        uint256 destChainId,
        uint256 fee,
        bytes data,
        bytes32 extra
    );
    event Executed(bytes32 hash);
    event Deposit(address contractId, uint256 value);
    event Withdraw(address contractId, uint256 value);

    constructor(uint256 chainId_, address config_) Ownable2Step() {
        _chainId = chainId_;
        _config = config_;
        
    }

    function dispatch(
        address destContractId,
        bytes calldata data,
        uint256 destChainId,
        bytes32 extra
    ) external override {
        bytes32 hash = getHash(_dispatchId.current());

        _executed[hash] = false;

        uint256 fee = _payGas(destChainId);

        emit Dispatch(
            hash,
            destContractId,
            _msgSender(),
            destChainId,
            fee,
            data,
            extra
        );

        _dispatchId.increment();
    }

    function execute(
        bytes32 hash,
        address destContractId,
        bytes calldata data,
        uint256 fromChainId,
        bytes32 extra
    ) external {      
        require(!_executed[hash], "Execute Completed");
        require(verifyHash(hash), "Validation Failed");

        IW3LinkApp(destContractId).execute(fromChainId, data, extra);

        _executed[hash] = true;

        emit Executed(hash);
    }

    function _payGas(uint256 destChainId) internal returns (uint256) {
        IW3LinkConfig w3linkConfig = IW3LinkConfig(_config);

        uint256 fee = w3linkConfig.fee(destChainId);
        if (fee == 0) return 0;

        Gas storage gas = _gasContents[_msgSender()];
        require(gas.value >= fee, "Insufficient value");
        gas.value -= fee;

        return fee;
    }

    function deposit() external payable override {
        uint256 amount = msg.value;

        _gasContents[_msgSender()].value += amount;
        payable(owner()).transfer(amount);
        emit Deposit(_msgSender(), amount);
    }

    function withdraw(uint256 amount) external override {
        Gas storage gas = _gasContents[_msgSender()];
        require(gas.value >= amount, "Insufficient value");
        gas.value -= amount;

        payable(_msgSender()).transfer(amount);
        emit Withdraw(_msgSender(), amount);
    }

    function setConfig(address newConfig) external onlyOwner {
        _config = newConfig;
        emit SetConfig(newConfig);
    }

    function config() external view override returns (address) {
        return _config;
    }
}
