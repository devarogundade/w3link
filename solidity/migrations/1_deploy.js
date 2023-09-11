const W3LinkConfig = artifacts.require("W3LinkConfig")
const W3Link = artifacts.require("W3Link")
const W3LinkVRF = artifacts.require("W3LinkVRF")
const W3LinkUintApi = artifacts.require("W3LinkUintApi")
const Twirl = artifacts.require("Twirl")
const TwirlExtension = artifacts.require("TwirlExtension")
// const TwirlFaucet = artifacts.require("TwirlFaucet")

const chainIds = { 'bnbTestnet': 97, 'sepolia': 11155111, 'mumbai': 80001, 'pegoTestnet': 123456 }

module.exports = async function (deployer, network, accounts) {
    return
    await deployer.deploy(W3LinkConfig, accounts[0])
    await deployer.deploy(W3Link, chainIds[network], W3LinkConfig.address)

    await deployer.deploy(Twirl, W3Link.address)
    await deployer.deploy(TwirlExtension, W3Link.address)
    // await deployer.deploy(TwirlFaucet, 'Twirl by Idowu', 'TWL')
};