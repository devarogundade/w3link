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
})

contract('whirl', async accounts => {
    // it('whirl: Set Dest', async () => {
    //     const whirl = await Whirl.deployed()
    //     await whirl.setExtContract(97, '0xB87b6262Cc3711673fD428fdf0D55B2C904C20D9')
    // })

    // it('Whirl: Mint NFT', async () => {
    //     const whirlFaucet = await WhirlFaucet.deployed()
    //     await whirlFaucet.getFreeNft(JSON.stringify({ image: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', name: 'Saturday for Coding!', symbol: 'SFC' }))
        
    //     await whirlFaucet.approve(Whirl.address, 1)
    // })

    it('whirl: NFT Holder', async () => {
        const whirlFaucet = await WhirlFaucet.deployed()
        let nfts = await whirlFaucet.ownedTokenIds(accounts[0])
        console.log(nfts);
    })

    // it('Whirl: Bridge NFT', async () => {
    //     const whirl = await Whirl.deployed()
    //     await whirl.bridge(97, 1, WhirlFaucet.address)
    // })
})