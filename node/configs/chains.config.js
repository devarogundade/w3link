const { Module } = require("vm");

module.exports = {
    Sepolia: 11155111,
    Mumbai: 80001,
    BnbTestnet: 97,
    PegoTestnet: 123456,
    w3linkIds: {
        11155111: '',
        80001: '',
        97: '0x08BF65d69665624C76C0B9d6D0052c5abC7C4f72',
        123456: '0x780433CC90978FB7c4F3c165327C3545aea983bF'
    },
    rpcs: {
        11155111: 'https://sepolia.gateway.tenderly.co',
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