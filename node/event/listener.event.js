const Web3 = require('web3')
const W3Link = require('./../abis/W3Link.json')
const { rpcs, w3linkIds, startBlocks } = require('./../configs/chains.config')
const { decodeLog, toDisptachModel, dispatchFormat } = require('./decoder.event')

exports.dispatch = async (chainId, callback) => {
    const web3 = new Web3(rpcs[chainId])
    const contract = new web3.eth.Contract(W3Link.abi, w3linkIds[chainId])

    contract.events.Dispatch({ filter: {}, fromBlock: startBlocks[chainId] }, (error, event) => {
        console.error('Event: ', error)
        console.log('Event: ', event)

        // const dispatchData = decodeLog(dispatchFormat, event.returnValues)
        // const dispatchModel = toDisptachModel(dispatchData, event.transactionHash, chainId)

        // callback(error, dispatchModel)
    })
}