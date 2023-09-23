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
        97: '0x7CAc15209c8cd33072FE3932cD6026Fa0577595A',
        123456: '0xA245627e1534D5355072C4105bA19406200927E9'
    },
    whirlExtensionIds: {
        11155111: '',
        80001: '',
        97: '0xB87b6262Cc3711673fD428fdf0D55B2C904C20D9',
        123456: '0x46Fae64A3a9cbf7C120e51ed1877c0223E429E38'
    },
    faucetIds: {
        11155111: '',
        80001: '',
        97: '0x75Be2aB14919B58A9634D10822CE0258e57F396F',
        123456: '0x809F5389b64C615f5a2796FF0c2Cfb73e52E4e9F'
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