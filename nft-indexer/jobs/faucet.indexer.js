const CronJob = require('cron').CronJob
const { chainId, rpc, startBlock, faucetId } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const WhirlFaucet = require('../abis/WhirlFaucet.json')
const Web3 = require('web3')

// @dev This listener is create for Pego Network Only

let fromBlock = startBlock

const job = new CronJob('*/30 * * * * *', async function () {
    try {
        console.log('Faucet Indexer: Running Job')

        const web3 = new Web3(rpc)
        const whirlFaucet = new web3.eth.Contract(WhirlFaucet.abi, faucetId)

        const latestBlock = await web3.eth.getBlockNumber()
        console.log('Faucet Indexer: Lastest Block ', latestBlock)

        if (fromBlock == latestBlock) return

        whirlFaucet.getPastEvents('NFTMinted', { filter: {}, fromBlock: fromBlock, toBlock: 'latest' }, function (error, events) {
            console.log('Faucet Indexer: Error ', error)
            console.log('Faucet Indexer: Events ', events)

            if (error) {
                console.error(error)
                return
            }

            for (let index = 0; index < events.length; index++) {
                const event = events[index]

                const eventModel = {
                    tokenAddress: event.returnValues.tokenAddress,
                    tokenId: event.returnValues.tokenId,
                    chainId: chainId,
                    tokenUri: event.returnValues.tokenUri,
                    owner: event.returnValues.owner
                }

                eventController.insertOrUpdate(eventModel)
            }
        })

        fromBlock = latestBlock

        console.log('Faucet Indexer: Ending Job')
    } catch (error) {
        console.error(error)
        if (!job.running) {
            job.start()
        }
    }
})

job.start()