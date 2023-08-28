const Web3 = require('web3')
const W3Link = require('./../abis/W3Link.json')
const { rpcs, w3linkIds } = require('./../configs/chains.config')

exports.dispatch = async (chainId, callback, startBlock = 0, filter = {}) => {
    const web3 = new Web3(rpcs[chainId])
    console.log(w3linkIds[chainId]);
    const contract = new web3.eth.Contract(W3Link.abi, w3linkIds[chainId])

    console.log(contract.events);

    contract.events.Dispatch({ filter: filter, fromBlock: startBlock }, (error, event) => {
        console.error('Error: ', error)
        console.log('Event: ', event)
        callback(error, event)
    })
}