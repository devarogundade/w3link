const { w3linkIds, rpcs } = require('../configs/chains.config')
const Web3 = require('web3')

const env = require('dotenv')
env.config()

const W3Link = require('../abis/W3Link.json')

// Signing Key and Address
const handlerEvmKey = process.env.HANDLER_EVM_PRIVATE_KEY
const handlerEvmAddress = process.env.HANDLER_EVM_PUBLIC_KEY

exports.processEvent = async (event) => {
    const web3 = new Web3(rpcs[event.destChainId])

    const w3Link = new web3.eth.Contract(W3Link.abi, w3linkIds[event.destChainId])

    console.log('Contract: ', w3Link)

    const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey)
    web3.eth.accounts.wallet.add(signer)

    console.log('Signer: ', signer)

    try {
        // const gas = await w3Link.methods.execute(
        //     event.hash,
        //     event.destContractId,
        //     event.data,
        //     event.fromChainId,
        //     event.extra
        // ).estimateGas({ from: handlerEvmAddress })
        // console.log('Gas: ', gas)

        // const gasPrice = await web3.eth.getGasPrice()
        // console.log('Gas Price: ', gasPrice)

        const { transactionHash } = await w3Link.methods.execute(
            event.hash,
            event.destContractId,
            event.data,
            event.fromChainId,
            event.extra
        ).send({
            from: handlerEvmAddress,
            gasPrice: 200_000,
            gas: 200_000
        })

        return transactionHash
    } catch (error) {
        console.error('Transaction: ', error)
        return null
    }
}