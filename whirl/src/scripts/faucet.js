import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import whirlFaucetJSON from '../contracts/WhirlFaucet.json'
import w3NFTJSON from '../contracts/WhirlNFT.json'
import Utils from './utils'

export async function isApproved(nft) {
    try {
        const addr = await readContract({
            address: nft.address,
            abi: w3NFTJSON.abi,
            functionName: 'getApproved',
            args: [nft.tokenId],
            chainId: nft.chainId
        })

        return addr == Utils.whirlIds[nft.chainId]
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function tryApprove(nft) {
    try {
        const config = await prepareWriteContract({
            address: nft.address,
            abi: w3NFTJSON.abi,
            functionName: 'approve',
            args: [Utils.whirlIds[nft.chainId], nft.tokenId],
            chainId: nft.chainId
        })

        const { hash } = await writeContract(config)

        return await waitForTransaction({ hash: hash })
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function tryMintNft(chainId, customUri = null) {
    try {
        const config = await prepareWriteContract({
            address: Utils.faucetIds[chainId],
            abi: whirlFaucetJSON.abi,
            functionName: 'getFreeNft',
            args: [customUri],
            chainId: chainId
        })

        const { hash } = await writeContract(config)

        return await waitForTransaction({ hash: hash })
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function tryFetchNfts(chainId, owner) {
    try {
        const tokenIds = readContract({
            address: Utils.faucetIds[chainId],
            abi: whirlFaucetJSON.abi,
            functionName: 'ownedTokenIds',
            args: [owner],
            chainId: chainId
        })

        
    } catch (error) {
        console.error(error)
        return []
    }
}