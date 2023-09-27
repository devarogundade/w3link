const Utils = {
    chains: [
        { id: 56, name: "BSC", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x38", rpc: "https://bsc-dataseed4.defibit.io", coin: "Binance Smart Chain", scan: 'https://bscscan.com' },
        { id: 20201022, name: "PEGO", image: "/images/pego.png", symbol: "PG", chainHexId: "0x1343e3e", rpc: "https://pegorpc.com", coin: "PEGO", scan: 'https://scan.pego.network' },
    ],
    chain: function (id) {
        return this.chains.find(chain => chain.id == id)
    },
    whirlIds: {
        56: '0x07a35276Dc26366Bb15D8E26cA0e7f1449B8fA00',
        20201022: '0x33d8Aceac786F1f5572550A9eB51C2Aca7AE5d67'
    },
    whirlExtensionIds: {
        56: '0xa4244fAb5ED5F0f99a27F228a9A91776F731C5Af',
        20201022: '0xb32aAD4C0b1998FB68bFa0fFbDaF2c45DCaE2c8b'
    },
    faucetIds: {
        56: '0x33d8Aceac786F1f5572550A9eB51C2Aca7AE5d67',
        20201022: '0x62238545ab485B674ee09f7c24297E94abE5a67b'
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