import { prepareWriteContract, writeContract, waitForTransaction, } from '@wagmi/core'
import BridgeJSON from '../../../solidity/build/contracts/LuckyCatsStake.json'
import { twirlIds } from './utils'

export async function tryBridge(toChainId, nft) {
    try {
        const config = await prepareWriteContract({
            address: twirlIds[nft.chainId],
            abi: BridgeJSON.abi,
            functionName: 'stake',
            args: [toChainId, nft.address, nft.tokenId],
            chainId: nft.chainId
        })

        const { hash } = await writeContract(config)

        return await waitForTransaction({ hash: hash })
    } catch (error) {
        console.error(error);
        return null
    }
}