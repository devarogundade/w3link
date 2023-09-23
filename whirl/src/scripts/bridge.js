import { prepareWriteContract, writeContract, waitForTransaction, readContract, } from '@wagmi/core'
import whirlJSON from '../contracts/Whirl.json'
import whirlExtension from '../contracts/WhirlExtension.json'
import w3NFTJSON from '../contracts/W3NFT.json'
import Utils from './utils'

export async function tryEstimateFee(fromChainId, destChainId) {
    try {
        return await readContract({
            address: Utils.whirlIds[fromChainId],
            abi: whirlJSON.abi,
            functionName: 'estimateFee',
            args: [destChainId],
            chainId: fromChainId
        })
    } catch (error) {
        console.error(error);
        return 0
    }
}

export async function tryBridge(destChainId, nft) {
    try {
        const config = await prepareWriteContract({
            address: Utils.whirlIds[nft.chainId],
            abi: whirlJSON.abi,
            functionName: 'bridge',
            args: [destChainId, nft.tokenId, nft.address],
            chainId: nft.chainId
        })

        const { hash } = await writeContract(config)

        return await waitForTransaction({ hash: hash })
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function tryRevoke(nft) {
    try {
        const config = await prepareWriteContract({
            address: Utils.whirlExtensionIds[nft.chainId],
            abi: whirlExtension.abi,
            functionName: 'revoke',
            args: [nft.address, nft.tokenId],
            chainId: nft.chainId
        })

        const { hash } = await writeContract(config)

        return await waitForTransaction({ hash: hash })
    } catch (error) {
        console.error(error);
        return null
    }
}

// export async function tryFetchNfts(chainId, owner) {
//     try {
//         return readContract({
//             address: Utils.whirlIds[chainId],
//             abi: w3NFTJSON.abi,
//             functionName: 'ownedTokenIds',
//             args: [owner],
//             chainId: chainId
//         })
//     } catch (error) {
//         console.error(error)
//         return []
//     }
// }

// export async function tryFetchExtNfts(chainId, owner) {
//     try {
//         return readContract({
//             address: Utils.whirlExtensionIds[chainId],
//             abi: w3NFTJSON.abi,
//             functionName: 'ownedTokenIds',
//             args: [owner],
//             chainId: chainId
//         })
//     } catch (error) {
//         console.error(error)
//         return []
//     }
// }