const W3LinkConfig = artifacts.require("W3LinkConfig")
const W3Link = artifacts.require("W3Link")
const W3LinkVRF = artifacts.require("W3LinkVRF")
const W3LinkUintApi = artifacts.require("W3LinkUintApi")
const Twirl = artifacts.require("Twirl")
const TwirlExtension = artifacts.require("TwirlExtension")
const TwirlFaucet = artifacts.require("TwirlFaucet")

contract('W3LinkConfig', async accounts => {
    it('W3LinkConfig: Set Fee', async () => {
        const w3LinkConfig = await W3LinkConfig.deployed()
        await w3LinkConfig.setFee(97 , '0')
    })
})

contract('Twirl', async accounts => {
    it('Twirl: Set Dest', async () => {
        const twirl = await Twirl.deployed()
        await twirl.setExtContract(97, '')
    })

    it('Twirl: Mint NFT', async () => {
        const twirlFaucet = await TwirlFaucet.deployed()
        await twirlFaucet.mint('')
    })

    it('Twirl: Bridge NFT', async () => {
        const twirl = await Twirl.deployed()
        await twirl.bridge(97, 1, TwirlFaucet.address)
    })
})