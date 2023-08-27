const { default: BigNumber } = require('bignumber.js')
const hashUtils = require('../utils/hash')
const { convert } = require('../utils/baseconverter')

exports.toEvent = (transaction) => {
    if (!transaction) return null
    
    return {
        bridgeHash: hashUtils.newHash(),
        status: 'DISPATCHED',
        fromHash: transaction.fromHash,
        toHash: '',
        dispatchTimestamp: Date.now(),
        validator: '',
        sncAddress: '',
        bridgeFee: convert(transaction.bridgeFee, 'wei', 'wei'),
        bridgeNumber: 0,

        nonce: transaction.nonce,
        fromChainId: transaction.fromChainId,
        fromContractId: transaction.fromContractId,
        destChainId: transaction.destChainId,
        destContractId: transaction.destContractId,

        slot0U32: convert(transaction.data.slot0U32, 'wei', 'wei'),
        slot1U32: convert(transaction.data.slot1U32, 'wei', 'wei'),

        slot0U64: convert(transaction.data.slot0U64, 'wei', 'wei'),
        slot1U64: convert(transaction.data.slot1U64, 'wei', 'wei'),
        slot2U64: convert(transaction.data.slot2U64, 'wei', 'wei'),

        slot0B256: transaction.data.slot0B256,
        slot1B256: transaction.data.slot1B256,
        slot2B256: transaction.data.slot2B256,
        slot3B256: transaction.data.slot3B256
    }
}