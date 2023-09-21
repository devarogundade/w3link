const W3LinkConfig = artifacts.require("W3LinkConfig")
const W3Link = artifacts.require("W3Link")
const W3LinkVRF = artifacts.require("W3LinkVRF")
const W3LinkUintApi = artifacts.require("W3LinkUintApi")
const whirl = artifacts.require("whirl")
const whirlExtension = artifacts.require("whirlExtension")
const whirlFaucet = artifacts.require("whirlFaucet")

contract('W3LinkConfig', async accounts => {
    // it('W3LinkConfig: Set Fee', async () => {
    //     const w3LinkConfig = await W3LinkConfig.deployed()
    //     await w3LinkConfig.setFee(80001 , '0')
    // })
})

contract('whirl', async accounts => {
    // it('whirl: Set Dest', async () => {
    //     const whirl = await whirl.deployed()
    //     await whirl.setExtContract(80001, '0xa13a01C59369D6cda5BD802Caa669fd47fF1deDD')
    // })

    // it('whirl: Mint NFT', async () => {
    //     const whirlFaucet = await whirlFaucet.deployed()
    //     await whirlFaucet.mint(JSON.stringify({ image: null, name: 'Chisom\'s Movie Ticket', symbol: 'CMT' }))
        
    //     await whirlFaucet.approve(whirl.address, 1)
    // })

    // it('whirl: Bridge NFT', async () => {
    //     const whirl = await whirl.deployed()
    //     await whirl.bridge(80001, 1, whirlFaucet.address)
    // })
})