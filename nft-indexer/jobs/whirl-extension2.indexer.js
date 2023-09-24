const CronJob = require('cron').CronJob
const { rpc, startBlock, whirlExtensionId } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const WhirlExtension = require('../abis/WhirlExtension.json')
const Web3 = require('web3')

// @dev This listener is create for Pego Network Only

let fromBlock = startBlock

const job = new CronJob('*/30 * * * * *', async function () {
    try {
        console.log('Whirl Extension Indexer: Running Job')

        const web3 = new Web3(rpc)
        const whirlExtension = new web3.eth.Contract(WhirlExtension.abi, whirlExtensionId)

        const latestBlock = await web3.eth.getBlockNumber()
        console.log('Whirl Extension Indexer: Lastest Block ', latestBlock)

        if (fromBlock == latestBlock) return

        whirlExtension.getPastEvents('NFTBurnt', { filter: {}, fromBlock: fromBlock, toBlock: 'latest' }, function (error, events) {
            console.log('Whirl Extension Indexer: Error ', error)
            console.log('Whirl Extension Indexer: Events ', events)

            if (error) {
                console.error(error)
                return
            }

            for (let index = 0; index < events.length; index++) {
                const event = events[index]

                const eventModel = {
                    tokenAddress: event.returnValues.tokenAddress,
                    tokenId: event.returnValues.tokenId
                }

                eventController.delete(eventModel)
            }
        })

        fromBlock = latestBlock

        console.log('Whirl Extension Indexer: Ending Job')
    } catch (error) {
        console.error(error)
        if (!job.running) {
            job.start()
        }
    }
})

job.start()