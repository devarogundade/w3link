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
        11155111: '',
        80001: '',
        97: '0xa1A76980C539e7EFD6e39516be45a393b20Ee000',
        123456: '0x1f08C8abC3Abc7b14DB4432cd4559cbD8abd7C03'
    },
    whirlExtensionIds: {
        11155111: '',
        80001: '',
        97: '0xE0EaD839A58B96FdbAB5fC2C6A77C8Ba92389530',
        123456: '0xC5FF00FF309B1337Cf144b37C150D350352C4802'
    },
    faucetIds: {
        11155111: '',
        80001: '',
        97: '0x3aFD76d8A30A8a1d16b8b9Bc7779C297DBD37bea',
        123456: '0x8604b54f18b3f36B2D02c097BB72794d2eD08bb5'
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