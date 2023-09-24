import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'
import axios from 'axios'
import Web3 from 'web3'

export async function tryGetPegoNfts(address) {
    try {
        const allNFTs = []

        const response = await axios.get(`https://nft.w3-link.site/${address}/nfts`)

        response.data.data.forEach(nft => {
            allNFTs.push({
                address: nft.tokenAddress,
                tokenId: nft.tokenId,
                chainId: nft.chainId,
                uri: JSON.parse(nft.tokenUri).image,
                name: JSON.parse(nft.tokenUri).name,
                symbol: ''
            })
        })

        return allNFTs
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function tryGetNfts(address) {
    try {
        const allNFTs = []

        const chains = [EvmChain.MUMBAI, EvmChain.BSC_TESTNET, EvmChain.SEPOLIA]

        for (const chain of chains) {
            const response = await Moralis.EvmApi.nft.getWalletNFTs({ address, chain })
            console.log(response.result);
            response.result.forEach(nft => {
                allNFTs.push({
                    address: nft.tokenAddress.lowercase,
                    tokenId: nft.tokenId,
                    chainId: Number(nft.chain.hex),
                    uri: nft.metadata ? nft.metadata.image : nft.tokenUri,
                    name: nft.metadata ? nft.metadata.name : 'Unkwown',
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

export function tryDecode(data) {
    try {
        const web3 = new Web3('https://rpc.ankr.com/eth')
        const format = ['uint256', 'address', 'string', 'string', 'string', 'address']
        const value = web3.eth.abi.decodeParameters(format, data)
        return {
            tokenId: value[0],
            address: value[1],
            name: value[2],
            symbol: value[3],
            tokenUri: value[4],
            owner: value[5]
        }
    } catch (error) {
        console.error(error)
        return {
            tokenId: 0,
            name: 'Not found',
            symbol: 'NaN',
            tokenUri: '',
            owner: ''
        }
    }
}
