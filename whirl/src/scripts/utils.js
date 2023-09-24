const Utils = {
    chains: [
        { id: 11155111, name: "Sepolia", image: "/images/ethereum.png", symbol: "ETH", chainHexId: "0xaa36a7", rpc: "https://rpc.notadegen.com/sepolia", coin: "Ethereum" },
        { id: 97, name: "BSC Testnet", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x61", rpc: "https://bsc-testnet.public.blastapi.io", coin: "Binance Smart Chain" },
        { id: 80001, name: "Mumbai", image: "/images/polygon.png", symbol: "MATIC", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "Polygon" },
        { id: 123456, name: "PEGO", image: "/images/pego.png", symbol: "PG", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "PEGO" },
    ],
    chain: function (id) {
        return this.chains.find(chain => chain.id == id)
    },
    whirlIds: {
        11155111: '',
        80001: '',
        97: '0x7FE498BCb26052A887c2e5723D97bd50a05586a4',
        123456: '0x8d8eD11A38a7ABe7feb5c13fCcb7Ce3c671e9700'
    },
    whirlExtensionIds: {
        11155111: '',
        80001: '',
        97: '0x6F8DaE206Dd3e478555854765a7FCCcFDa04Be87',
        123456: '0x8DccbDaFB697d0342E397fe17294DD888C09385f'
    },
    faucetIds: {
        11155111: '',
        80001: '',
        97: '0x049C1fF65E38ddb786f364D9C5e0d3c8120130D0',
        123456: '0x6C7C79d4ECDBd60891368Fc4924a4224F00cff6A'
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