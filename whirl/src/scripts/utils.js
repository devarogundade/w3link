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
        11155111: '0xE11e8fB7bdA1775AA9FbE9CcAdDaF6fA2F5De46C',
        80001: '0xb4A3577f75D897dC40D079A0DA5C8aC4E5f5F1D8',
        97: '0x09d0482b6903099A1bCB8475472BA6E68b9d07bE',
        123456: '0xb5dE5d0995B34c1f057B08357ee1C2B552237BC5'
    },
    whirlExtensionIds: {
        11155111: '0x43f42617d49bC7e178F7a47edf77B1A9162AB30C',
        80001: '0x3A307963018BAecA8Bbe1d824f565907205F7a4c',
        97: '0x1DdD50fD806C79a189Fe0eb57fB90ACDefDA8f0b',
        123456: '0x64444e1ce8089FE0e417CaA6148967f9545fF1e0'
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