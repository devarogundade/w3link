const Utils = {
    chains: [
        { id: 56, name: "BSC", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x38", rpc: "https://bsc-dataseed4.defibit.io", coin: "Binance Smart Chain", scan: 'https://bscscan.com' },
        { id: 20201022, name: "PEGO", image: "/images/pego.png", symbol: "PG", chainHexId: "0x1343e3e", rpc: "https://pegorpc.com", coin: "PEGO", scan: 'https://scan.pego.network' },
    ],
    chain: function (id) {
        return this.chains.find(chain => chain.id == id)
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