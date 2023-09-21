const W3LinkConfig = artifacts.require("W3LinkConfig")
const W3Link = artifacts.require("W3Link")
const W3LinkVRF = artifacts.require("W3LinkVRF")
const W3LinkUintApi = artifacts.require("W3LinkUintApi")
const whirl = artifacts.require("whirl")
const whirlExtension = artifacts.require("whirlExtension")
// const whirlFaucet = artifacts.require("whirlFaucet")

const chainIds = { 'bnbTestnet': 97, 'sepolia': 11155111, 'mumbai': 80001, 'pegoTestnet': 123456 }

module.exports = async function (deployer, network, accounts) {
    return
    await deployer.deploy(W3LinkConfig, accounts[0])
    await deployer.deploy(W3Link, chainIds[network], W3LinkConfig.address)

    await deployer.deploy(whirl, W3Link.address)
    await deployer.deploy(whirlExtension, W3Link.address)
    // await deployer.deploy(whirlFaucet, 'whirl by Idowu', 'TWL')
};