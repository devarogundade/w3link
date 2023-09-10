import { Chain } from '@wagmi/core'

export const pegoTestnet = {
    id: 123456,
    name: 'PEGO Testnet',
    network: 'PEGO',
    nativeCurrency: {
        decimals: 18,
        name: 'PEGO',
        symbol: 'tPG',
    },
    rpcUrls: {
        public: { http: ['https://rpc.pegotest.net'] },
        default: { http: ['https://rpc.pegotest.net'] },
    },
    blockExplorers: {
        etherscan: { name: 'PEGO Testnet Scan', url: 'https://scan.pegotest.net' },
        default: { name: 'PEGO Testnet Scan', url: 'https://scan.pegotest.net' },
    }
} as const satisfies Chain

export const pego = {
    id: 20201022,
    name: 'PEGO',
    network: 'PEGO',
    nativeCurrency: {
        decimals: 18,
        name: 'PEGO',
        symbol: 'PG',
    },
    rpcUrls: {
        public: { http: ['https://pegorpc.com'] },
        default: { http: ['https://pegorpc.com'] },
    },
    blockExplorers: {
        etherscan: { name: 'PEGO Scan', url: 'https://scan.pego.network' },
        default: { name: 'PEGO Scan', url: 'https://scan.pego.network' },
    }
} as const satisfies Chain