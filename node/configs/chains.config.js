const { Module } = require("vm");

module.exports = {
    Sepolia: 11155111,
    Mumbai: 80001,
    BnbTestnet: 97,
    PegoTestnet: 123456,
    w3linkIds: {
        11155111: '0xb32aAD4C0b1998FB68bFa0fFbDaF2c45DCaE2c8b',
        80001: '0xbd93dc3caB5F589C3b09B7d86ee2D4092Fd3A24d',
        97: '0x8E1DD366F6c6Ede0f9227289A8aa9b1C59563718',
        123456: '0x8E1DD366F6c6Ede0f9227289A8aa9b1C59563718'
    },
    rpcs: {
        11155111: 'https://sepolia.gateway.tenderly.co',
        80001: 'https://rpc.ankr.com/polygon_mumbai',
        97: 'https://bsc-testnet.public.blastapi.io',
        123456: 'https://beta-3.fuel.network/graphql',
    }
};