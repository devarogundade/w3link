const { } = require('../configs/chains.config')
const Web3 = require('web3')

const env = require('dotenv')
env.config()

const W3Link = require('../abis/W3Link.json')

// Signing Key and Address
const handlerEvmKey = process.env.HANDLER_EVM_PRIVATE_KEY
const handlerEvmAddress = process.env.HANDLER_EVM_PUBLIC_KEY

exports.processEvent = async (event) => {
    const web3 = new Web3(rpcs[event.destChainId])

    const contract = new web3.eth.Contract(W3Link.abi, w3linkIds[event.destChainId])
    const account = web3.eth.accounts.privateKeyToAccount(handlerEvmKey)
    web3.eth.accounts.wallet.add(account);

    try {
        const gas = await contract.methods.execute(
            event.hash,
            event.destContractId,
            event.fromContractId,
            event.data,
            event.destChainId,
            event.extra
        ).estimateGas({ from: handlerEvmAddress })
        const gasPrice = await web3.eth.getGasPrice()

        const { transactionHash } = await contract.methods.execute(
            event.hash,
            event.destContractId,
            event.fromContractId,
            event.data,
            event.destChainId,
            event.extra
        ).send({
            from: handlerEvmAddress,
            gasPrice: gasPrice,
            gas: gas
        })

        return transactionHash
    } catch (error) {
        console.error(error)
        return null
    }
}