const Utils = {
    chains: [
        { id: 56, name: "BSC", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x38", rpc: "https://bsc-dataseed4.defibit.io", coin: "Binance Smart Chain", scan: 'https://bscscan.com' },
        { id: 20201022, name: "PEGO", image: "/images/pego.png", symbol: "PG", chainHexId: "0x1343e3e", rpc: "https://pegorpc.com", coin: "PEGO", scan: 'https://scan.pego.network' },
    ],
    chain: function (id) {
        return this.chains.find(chain => chain.id == id)
    },
    whirlIds: {
        56: '0x09d0482b6903099A1bCB8475472BA6E68b9d07bE',
        20201022: '0xb5dE5d0995B34c1f057B08357ee1C2B552237BC5'
    },
    whirlExtensionIds: {
        56: '0xad397ABF9a38ec497dE0c781EF35ac701799693C',
        20201022: '0xF8b650e0e939ed2421093C4A786DB9ce8b49E63f'
    },
    faucetIds: {
        56: '0x289Aa7e160D284a349dc881886eE252Ad87baB46',
        20201022: '0xA300bb38739B3Ed509E2B742921e426Eea4523Ab'
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