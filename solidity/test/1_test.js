const W3LinkConfig = artifacts.require("W3LinkConfig")
const W3Link = artifacts.require("W3Link")
const W3LinkVRF = artifacts.require("W3LinkVRF")
const W3LinkUintApi = artifacts.require("W3LinkUintApi")
const Whirl = artifacts.require("Whirl")
const WhirlExtension = artifacts.require("WhirlExtension")
const WhirlFaucet = artifacts.require("WhirlFaucet")

contract('W3LinkConfig', async accounts => {
    // it('W3LinkConfig: Set Fee', async () => {
    //     const w3LinkConfig = await W3LinkConfig.deployed()
    //     await w3LinkConfig.setFee(97 , '0')
    // })

    // it('W3LinkConfig: Set Fee', async () => {
    //     const w3LinkConfig = await W3LinkConfig.deployed()
    //     await w3LinkConfig.setFee(123456 , '0')
    // })
})

contract('whirl', async accounts => {
    // it('whirl: Set Dest', async () => {
    //     const whirl = await Whirl.deployed()
    //     await whirl.setExtContract(97, '0xE0EaD839A58B96FdbAB5fC2C6A77C8Ba92389530')
    // })

    it('Whirl Extension: Set Source', async accounts => {
        const whirlExtension = await WhirlExtension.deployed()
        await whirlExtension.setWhlContract(123456, '0x1f08C8abC3Abc7b14DB4432cd4559cbD8abd7C03')
    })

    // it('Whirl: Mint NFT', async () => {
    //     const whirlFaucet = await WhirlFaucet.deployed()
    //     await whirlFaucet.getFreeNft(JSON.stringify({ image: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', name: 'Saturday for Coding!', description: 'This is the bunny song!' }))

    //     await whirlFaucet.approve(Whirl.address, 1)
    // })

    // it('Whirl: Bridge NFT', async () => {
    //     const whirl = await Whirl.deployed()
    //     await whirl.bridge(97, 1, WhirlFaucet.address)
    // })
})