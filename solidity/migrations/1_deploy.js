const W3LinkConfig = artifacts.require("W3LinkConfig")
const W3Link = artifacts.require("W3Link")
const Whirl = artifacts.require("Whirl")
const WhirlExtension = artifacts.require("WhirlExtension")
const WhirlFaucet = artifacts.require("WhirlFaucet")

const chainIds = {
    'bscTestnet': 97, 'sepolia': 11155111, 'mumbai': 80001, 'pegoTestnet': 123456,
    'bsc': 56, 'polygon': 137, 'ethereum': 1, 'pego': 20201022
}

module.exports = async function (deployer, network, accounts) {
    return
    await deployer.deploy(W3LinkConfig, accounts[0])
    await deployer.deploy(W3Link, chainIds[network], W3LinkConfig.address)

    await deployer.deploy(Whirl, W3Link.address)
    await deployer.deploy(WhirlExtension, W3Link.address)
    await deployer.deploy(WhirlFaucet, 'Whirl NFT by W3Link', 'WRL')
};