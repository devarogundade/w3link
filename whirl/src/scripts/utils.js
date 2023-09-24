const Utils = {
    chains: [
        { id: 11155111, name: "Sepolia", image: "/images/ethereum.png", symbol: "ETH", chainHexId: "0xaa36a7", rpc: "https://rpc.notadegen.com/sepolia", coin: "Ethereum", scan: 'https://sepolia.etherscan.io' },
        { id: 97, name: "BSC Testnet", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x61", rpc: "https://bsc-testnet.public.blastapi.io", coin: "Binance Smart Chain", scan: 'https://testnet.bscscan.com' },
        { id: 80001, name: "Mumbai", image: "/images/polygon.png", symbol: "MATIC", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "Polygon", scan: 'https://mumbai.polygonscan.com' },
        { id: 123456, name: "PEGO", image: "/images/pego.png", symbol: "PG", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "PEGO", scan: 'https://scan.pegotest.net' },
    ],
    chain: function (id) {
        return this.chains.find(chain => chain.id == id)
    },
    whirlIds: {
        11155111: '0x6482f60D57207E6F030f2986B9c003981AF17786',
        80001: '0x82270c98Cc7D8CCd8BA71d5F94d478A1536B5Ab0',
        97: '0xF1E7e529fFbb0F7664acef15d7a609Bec8D5E824',
        123456: '0x4C3b224b30a505d64Ccce0dCFf99669091a20dac'
    },
    whirlExtensionIds: {
        11155111: '0x8eB8BC1bD8ddA410265b2E6D33F8924E7652bfCe',
        80001: '0x55894Bb2C6fCB4687B64cA5E317416dc76C28cB5',
        97: '0x1CA59BfC199A9baf6e0654F3b1AA997bE5e938a2',
        123456: '0x2b3A34c1871Bd30fa679b02def4818c65FbDFd99'
    },
    faucetIds: {
        11155111: '0x5E011b621d96f73a2c93c5d57CeE619AE595b409',
        80001: '0xa44a040DaC22F1327e67c58932123234272e84F9',
        97: '0x289Aa7e160D284a349dc881886eE252Ad87baB46',
        123456: '0xA300bb38739B3Ed509E2B742921e426Eea4523Ab'
    },
    toDate: function (timestamp) {
        var a = new Date(timestamp)
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var month = months[a.getMonth()]
        var date = a.getDate()
        var hour = a.getHours()
        var min = a.getMinutes()
        return {
            month: month,
            date: date,
            hour: hour,
            min: min
        };
    }
}

export default Utils