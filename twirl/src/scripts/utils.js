const Utils = {
    chains: [
        { id: 11155111, name: "Sepolia", image: "/images/ethereum.png", symbol: "ETH", chainHexId: "0xaa36a7", rpc: "https://rpc.notadegen.com/sepolia", coin: "Ethereum" },
        { id: 97, name: "BSC Testnet", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x61", rpc: "https://bsc-testnet.public.blastapi.io", coin: "Binance Smart Chain" },
        { id: 80001, name: "Mumbai", image: "/images/polygon.png", symbol: "MATIC", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "Polygon" },
        { id: 12456, name: "Pego", image: "/images/pego.png", symbol: "PG", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "PEGO" },
    ],
    chain: function (id) {
        return this.chains.find(chain => chain.id == id)
    },
    twirlIds: {
        11155111: '0x1b6c979548033dFfC88cEe698c9d3E83c3b0669d',
        97: '0x7dBd5B60c272cf5a712412259F7765C147F1cF26',
        80001: '0x9D35Cb69932f465064C9C73adB0a47e4062016fa',
        12456: '0x9D35Cb69932f465064C9C73adB0a47e4062016fa'
    },
    toDate: function (timestamp) {
        var a = new Date(timestamp * 1000)
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