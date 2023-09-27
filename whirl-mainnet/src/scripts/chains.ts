import { Chain } from '@wagmi/core'

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