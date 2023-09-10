const { Module } = require("vm");

module.exports = {
    Sepolia: 11155111,
    Mumbai: 80001,
    BnbTestnet: 97,
    PegoTestnet: 123456,
    w3linkIds: {
        11155111: '0x92904fb980C20474567aedB02E0cc20A1259F0E5',
        80001: '',
        97: '',
        123456: '0x92904fb980C20474567aedB02E0cc20A1259F0E5'
    },
    rpcs: {
        11155111: 'wss://sepolia.gateway.tenderly.co',
        80001: 'https://rpc.ankr.com/polygon_mumbai',
        97: 'https://bsc-testnet.public.blastapi.io',
        123456: 'https://rpc.pegotest.net',
    },
    startBlocks: {
        11155111: 0,
        80001: 0,
        97: 0,
        123456: 618144
    }
};