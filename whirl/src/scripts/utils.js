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
        97: '0x4C3b224b30a505d64Ccce0dCFf99669091a20dac',
        123456: '0x5179bE03a25489Cc6ee0a047E1dA22Ac42C23120'
    },
    whirlExtensionIds: {
        11155111: '',
        80001: '',
        97: '0x2b3A34c1871Bd30fa679b02def4818c65FbDFd99',
        123456: '0x9880DFEb756E65c48fa5c2AAb0DFB202f20F0F45'
    },
    faucetIds: {
        11155111: '',
        80001: '',
        97: '0x049C1fF65E38ddb786f364D9C5e0d3c8120130D0',
        123456: '0xCae9F789aAe68A4d0AF2c3a1632a37c765EcBE57'
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