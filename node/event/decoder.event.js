const Web3 = require('web3')
const hashUtils = require('./hash.event')

module.exports = {
    decodeLog: function (format, value) {
        const web3 = new Web3('https://rpc.ankr.com/eth')
        return web3.eth.abi.decodeParameters(format, value)
    },
    dispatchFormat: function () {
        return ['bytes32', 'address', 'address', 'uint256', 'uint256', 'bytes', 'bytes32']
    },
    toDisptachModel: function (data, transactionHash, fromChainId) {
        return {
            bridgeHash: hashUtils.newHash(),
            status: 'DISPATCHED',
            fromHash: transactionHash,
            toHash: '',
            dispatchTimestamp: Date.now(),
            validator: '',
            sncAddress: '',
            bridgeNumber: 0,

            hash: data[0],
            destContractId: data[1],
            fromContractId: data[2],
            fromChainId: fromChainId,
            destChainId: data[3],
            bridgeFee: data[4],
            data: data[5],
            extra: data[6]
        }
    }
}