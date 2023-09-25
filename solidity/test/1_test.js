const W3LinkConfig = artifacts.require("W3LinkConfig")
const W3Link = artifacts.require("W3Link")
const Whirl = artifacts.require("Whirl")
const WhirlExtension = artifacts.require("WhirlExtension")
const WhirlFaucet = artifacts.require("WhirlFaucet")

// PEGO Testnet

// contract('W3LinkConfig', async accounts => {
//     it('W3LinkConfig: Set Fee', async () => {
//         const w3LinkConfig = await W3LinkConfig.deployed()
//         await w3LinkConfig.setFee(97 , '500000000000000000')
//         await w3LinkConfig.setFee(80001 , '400000000000000000')
//         await w3LinkConfig.setFee(11155111 , '1200000000000000000')
//     })
// })

contract('whirl', async accounts => {
    it('whirl: Set Dest', async () => {
        const whirl = await Whirl.deployed()
        await whirl.setExtContract(97, '0x83f3C4E6aB2c369B68434607ce6878a650078519')
        await whirl.setExtContract(80001, '0xF87aD7fee79f420ACCBd2d19B45844F11480Be22')
        await whirl.setExtContract(11155111, '0x664698266Ba332Cb2D30D9FE4f8461577c8119Af')
    })

    it('Whirl Extension: Set Source', async () => {
        const whirlExtension = await WhirlExtension.deployed()
        await whirlExtension.setWhlContract(97, '0x09d0482b6903099A1bCB8475472BA6E68b9d07bE')
        await whirlExtension.setWhlContract(80001, '0xb4A3577f75D897dC40D079A0DA5C8aC4E5f5F1D8')
        await whirlExtension.setWhlContract(11155111, '0xE11e8fB7bdA1775AA9FbE9CcAdDaF6fA2F5De46C')
    })
})

// Binance Bruno

// contract('W3LinkConfig', async accounts => {
//     it('W3LinkConfig: Set Fee', async () => {
//         const w3LinkConfig = await W3LinkConfig.deployed()
//         await w3LinkConfig.setFee(123456 , '50000000000000000')
//     })
// })

// contract('whirl', async accounts => {
//     it('whirl: Set Dest', async () => {
//         const whirl = await Whirl.deployed()
//         await whirl.setExtContract(123456, '0xD7cC58E278a146055C19e105eD0f997eC0FC7fa8')
//     })

//     it('Whirl Extension: Set Source', async () => {
//         const whirlExtension = await WhirlExtension.deployed()
//         await whirlExtension.setWhlContract(123456, '0xb5dE5d0995B34c1f057B08357ee1C2B552237BC5')
//     })
// })

// Mumbai

// contract('W3LinkConfig', async accounts => {
//     it('W3LinkConfig: Set Fee', async () => {
//         const w3LinkConfig = await W3LinkConfig.deployed()
//         await w3LinkConfig.setFee(123456 , '150000000000000000')
//     })
// })

// contract('whirl', async accounts => {
//     it('whirl: Set Dest', async () => {
//         const whirl = await Whirl.deployed()
//         await whirl.setExtContract(123456, '0xD7cC58E278a146055C19e105eD0f997eC0FC7fa8')
//     })

//     it('Whirl Extension: Set Source', async () => {
//         const whirlExtension = await WhirlExtension.deployed()
//         await whirlExtension.setWhlContract(123456, '0xb5dE5d0995B34c1f057B08357ee1C2B552237BC5')
//     })
// })

// Sepolia

// contract('W3LinkConfig', async accounts => {
//     it('W3LinkConfig: Set Fee', async () => {
//         const w3LinkConfig = await W3LinkConfig.deployed()
//         await w3LinkConfig.setFee(123456 , '4000000000000000')
//     })
// })

// contract('whirl', async accounts => {
//     it('whirl: Set Dest', async () => {
//         const whirl = await Whirl.deployed()
//         await whirl.setExtContract(123456, '0xD7cC58E278a146055C19e105eD0f997eC0FC7fa8')
//     })

//     it('Whirl Extension: Set Source', async () => {
//         const whirlExtension = await WhirlExtension.deployed()
//         await whirlExtension.setWhlContract(123456, '0xb5dE5d0995B34c1f057B08357ee1C2B552237BC5')
//     })
// })
