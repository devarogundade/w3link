import { Web3Modal } from '@web3modal/html'
import { bscTestnet, sepolia, polygonMumbai } from '@wagmi/core/chains'
import { configureChains, createClient } from '@wagmi/core'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { pegoTestnet } from './chains'

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
export const chains = [bscTestnet, sepolia, polygonMumbai, pegoTestnet]

const WalletConnection = {
    web3modal: null,
    wagmiClient: null,

    fineAddress: function (addr) {
        if (addr == null || addr.length < 10) return ''
        return addr.substring(0, 5) + '...' + addr.substring(addr.length - 5, addr.length)
    },

    initialize: async function () {
        if (this.wagmiClient) return this.wagmiClient

        const { provider, webSocketProvider } = configureChains(
            chains,
            [w3mProvider({ projectId: PROJECT_ID })],
        )

        const wagmiClient = createClient({
            autoConnect: true,
            connectors: w3mConnectors({ projectId: PROJECT_ID, version: 1, chains }),
            provider: provider,
            webSocketProvider: webSocketProvider
        })

        return wagmiClient
    },

    ethereumClient: async function () {
        const wagmiClient = await this.initialize()
        return new EthereumClient(wagmiClient, chains)
    },

    openModal: async function (callback) {
        try {
            const ethereumClient = await this.ethereumClient()
            if (!this.web3modal) {
                this.web3modal = new Web3Modal({ projectId: PROJECT_ID }, ethereumClient)

                this.web3modal.setDefaultChain(pegoTestnet)
                this.web3modal.setTheme({
                    themeMode: 'dark',
                    themeVariables: {
                        '--w3m-font-family': 'Matter, sans-serif',
                        '--w3m-background-color': '#091121'
                    }
                })
            }

            await this.web3modal.openModal()

            ethereumClient.watchAccount((account) => {
                callback(account);
            })
        } catch (error) {
            console.error(error);
        }
    },

    getWallet: async function (callback) {
        try {
            const ethereumClient = await this.ethereumClient()

            ethereumClient.watchAccount((account) => {
                callback(account);
            })

            const account = ethereumClient.getAccount()
            callback(account)
        } catch (error) {
            console.error(error);
            return null
        }
    },

    switchNetwork: async function (destChainId) {
        try {
            const ethereumClient = await this.ethereumClient()

            console.log(ethereumClient);

            await ethereumClient.switchNetwork({ chainId: destChainId })

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

export default WalletConnection