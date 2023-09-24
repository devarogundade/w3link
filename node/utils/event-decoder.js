const Web3 = require('web3')

module.exports = {
    decodeLog: function (format, value) {
        const web3 = new Web3('https://rpc.ankr.com/eth')
        return web3.eth.abi.decodeParameters(format, value)
    },
    dispatchFormat: function (collection) {
        if (collection == 'dispatch') {
            return ['bytes32', 'address', 'address', 'uint256', 'uint256', 'bytes', 'bytes32']
        }
        return null
    },
    toDisptachModel: function (collection, data, transactionHash, fromChainId) {
        if (collection == 'dispatch') {
            return {
                bridgeHash: newHash(),
                status: 'DISPATCHED',
                fromHash: transactionHash,
                dispatchTimestamp: Date.now(),
                // event specific
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
        return null
    },
    newHash: function () {
        const left = (Math.random() + 1).toString(12).replace('.', '')
        const right = (Math.random() + 1).toString(24).replace('.', '')
        return `link_${left}${right}`
    }
}