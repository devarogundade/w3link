import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

export async function tryGetNfts(address) {
    try {
        const allNFTs = []

        const chains = [EvmChain.MUMBAI, EvmChain.BSC_TESTNET, EvmChain.SEPOLIA]

        for (const chain of chains) {
            const response = await Moralis.EvmApi.nft.getWalletNFTs({ address, chain })
            response.result.forEach(nft => {
                allNFTs.push({
                    address: nft.tokenAddress,
                    tokenId: nft.tokenId,
                    chainId: Number(nft.chain.hex),
                    uri: nft.metadata.image,
                    name: nft.metadata.name,
                    symbol: nft.symbol
                })
            })
        }

        return allNFTs
    } catch (error) {
        console.error(error)
        return []
    }
}

