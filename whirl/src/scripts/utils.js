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
        11155111: '0xd3850F69c2e51cF72d494524062A8359Bd7d3600',
        80001: '0xa79826BEF0B8ba7D4b19964EE725fc761e882Ba5',
        97: '0xd4c7a8eac899d1B6917cD8DbFDfd4BdC2F152621',
        123456: '0x0a772fE3fE308fd8cCC7f58c973D7dE05c2eE2D8'
    },
    whirlExtensionIds: {
        11155111: '0x9D4E92eA61c6B608f9337Ce1d87cf3cE8AD04414',
        80001: '0xf4DFDB8463B45fAAfAeef1e0aAB52044772f9944',
        97: '0x338EaBFE8Dda2214d71E56e57ECf19eD5440222e',
        123456: '0x0844c015f29A48d279E4977c755A260F15E69Cf4'
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