const Web3 = require('web3')
const hashUtils = require('../utils/hash')

module.exports = {
    decode: function (format, value) {
        const web3 = new Web3('https://rpc.ankr.com/eth')
        return web3.eth.abi.decodeParameters(format, value)
    },
    format: function (collection) {
        switch (collection) {
            case 'dispatch':
                return ['uint256', 'uint32', 'bytes32', 'uint32', 'bytes32', 'uint256', 'uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'bytes32', 'bytes32', 'bytes32', 'bytes32']
            default: return null
        }
    },
    toObject: function (collection, data, transactionHash, fromChainId) {
        switch (collection) {
            case 'dispatch':
                return {
                    bridgeHash: hashUtils.newHash(),
                    status: 'DISPATCHED',
                    fromHash: transactionHash,
                    toHash: '',
                    dispatchTimestamp: Date.now(),
                    validator: '',
                    sncAddress: '',
                    bridgeNumber: 0,
                    
                    nonce: data[0],
                    fromChainId: fromChainId,
                    fromContractId: data[2],
                    destChainId: data[3],
                    destContractId: data[4],
                    bridgeFee: data[5],

                    slot0U32: data[6],
                    slot1U32: data[7],

                    slot0U64: data[8],
                    slot1U64: data[9],
                    slot2U64: data[10],

                    slot0B256: data[11],
                    slot1B256: data[12],
                    slot2B256: data[13],
                    slot3B256: data[14]
                }
            default: return null
        }
    }
}