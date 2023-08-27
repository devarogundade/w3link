const { } = require('./configs/chains.config')
const Web3 = require('web3')

const env = require('dotenv')
env.config()

const W3Link = require('./abis/W3Link.json')

// Contract Ids
const w3linkIds = {
    11155111: '0xb32aAD4C0b1998FB68bFa0fFbDaF2c45DCaE2c8b',
    80001: '0xbd93dc3caB5F589C3b09B7d86ee2D4092Fd3A24d',
    97: '0x8E1DD366F6c6Ede0f9227289A8aa9b1C59563718',
    123456: '0x46266fe5b27cb7feb5dafcec833b375c6c31f57fd388c86448c82ca2a3eac01c'
}

// Chain RPCs
const rpcs = {
    11155111: 'https://sepolia.gateway.tenderly.co',
    80001: 'https://rpc.ankr.com/polygon_mumbai',
    97: 'https://bsc-testnet.public.blastapi.io',
    123456: 'https://beta-3.fuel.network/graphql',
}

// KEYS and ADDRESSES
const handlerEvmKey = process.env.HANDLER_EVM_PRIVATE_KEY
const handlerEvmAddress = process.env.HANDLER_EVM_PUBLIC_KEY

exports.processEvent = async (event) => {
    const payload = {
        hash: event.hash,
        fromChainId: event.fromChainId,
        fromContractId: event.fromContractId,
        destChainId: event.destChainId,
        destContractId: event.destContractId,
        bridgeFee: event.bridgeFee,
        data: event.data
    }

    console.log(payload);

    const web3 = new Web3(rpcs[payload.destChainId])

    const contract = new web3.eth.Contract(W3Link.abi, w3linkIds[payload.destChainId])
    const account = web3.eth.accounts.privateKeyToAccount(handlerEvmKey)
    web3.eth.accounts.wallet.add(account);

    try {
        const gas = await contract.methods.swayExecute(payload).estimateGas({ from: handlerEvmAddress })
        const gasPrice = await web3.eth.getGasPrice()

        const { transactionHash } = await contract.methods.swayExecute(payload).send({
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