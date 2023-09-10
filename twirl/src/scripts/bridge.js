import { prepareWriteContract, writeContract, waitForTransaction, readContract, } from '@wagmi/core'
import TwirlJSON from '../contracts/Twirl.json'
import TwirlExtension from '../contracts/TwirlExtension.json'
import Utils from './utils'

export async function tryEstimateFee(fromChainId, destChainId) {
    try {
        return await readContract({
            address: Utils.twirlIds[fromChainId],
            abi: TwirlJSON.abi,
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
            address: Utils.twirlIds[nft.chainId],
            abi: TwirlJSON.abi,
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
            address: Utils.twirlExtensionIds[nft.chainId],
            abi: TwirlExtension.abi,
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