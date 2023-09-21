import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import whirlFaucetJSON from '../contracts/whirlFaucet.json'
import Utils from './utils'

export async function tryMintNft(chainId, customUri = null) {
    try {
        const config = await prepareWriteContract({
            address: Utils.whirlIds[chainId],
            abi: whirlFaucetJSON.abi,
            functionName: 'mint',
            args: [customUri],
            chainId: chainId
        })

        const { hash } = await writeContract(config)

        return await waitForTransaction({ hash: hash })
    } catch (error) {
        console.error(error);
        return null
    }
}