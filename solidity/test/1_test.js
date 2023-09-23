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
    //     await whirl.setExtContract(97, '0x00302a37D885527c4c8Aa06531af678313626a91')
    // })

    it('Whirl Extension: Set Source', async accounts => {
        const whirlExtension = await WhirlExtension.deployed()
        await whirlExtension.setTwlContract(123456, '0x6482f60D57207E6F030f2986B9c003981AF17786')
    })

    // it('Whirl: Mint NFT', async () => {
    //     const whirlFaucet = await WhirlFaucet.deployed()
    //     await whirlFaucet.getFreeNft(JSON.stringify({ image: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', name: 'Saturday for Coding!', symbol: 'SFC' }))

    //     await whirlFaucet.approve(Whirl.address, 1)
    // })

    // it('Whirl: Bridge NFT', async () => {
    //     const whirl = await Whirl.deployed()
    //     await whirl.bridge(97, 1, WhirlFaucet.address)
    // })

    // it('Whirl: Execute', async () => {
    //     const w3Link = await W3Link.deployed()
    //     await w3Link.execute(
    //         '0x0000000000000000000000000000000000000000000000000000000000000000',
    //         '0x00302a37D885527c4c8Aa06531af678313626a91',
    //         '0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e11e8fb7bda1775aa9fbe9ccaddaf6fa2f5de46c00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000032fa9fdea16f705fd74647d7d4c1a662b6451960000000000000000000000000000000000000000000000000000000000000013576869726c204e46542062792057334c696e6b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000357524c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a87b22696d616765223a2268747470733a2f2f696d672e6672656570696b2e636f6d2f7072656d69756d2d70686f746f2f6769726c2d776974682d76722d676c61737365732d6d65746176657273652d636f6e636570742d67656e6572617465642d61695f3830323737302d3134382e6a70673f773d31333830222c226e616d65223a22536174757264617920666f7220436f64696e6721222c2273796d626f6c223a22534643227d000000000000000000000000000000000000000000000000',
    //         '123456',
    //         '0x0000000000000000000000000000000000000000000000000000000000000000'
    //     )
    // })
})