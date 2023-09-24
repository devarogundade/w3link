const W3Link = artifacts.require("W3Link")
const Whirl = artifacts.require("Whirl")
const WhirlExtension = artifacts.require("WhirlExtension")
const WhirlFaucet = artifacts.require("WhirlFaucet")

module.exports = async function (deployer, network, accounts) {
    // return
    // await deployer.deploy(Whirl, W3Link.address)
    await deployer.deploy(WhirlExtension, W3Link.address)
    // await deployer.deploy(WhirlFaucet, 'Whirl NFT by W3Link', 'WRL')
};