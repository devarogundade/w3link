const CronJob = require('cron').CronJob
const { chainId, rpc, whirlExtensionId } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const WhirlExtension = require('../abis/WhirlExtension.json')
const Web3 = require('web3')
const fs = require('fs')

// @dev This listener is create for Pego Network Only

const job = new CronJob('*/20 * * * * *', async function () {
    try {
        const data = fs.readFileSync('jobs/whirl-extension.indexer.json', "utf-8")
        const json = JSON.parse(data)

        const fromBlock = json.startBlocks[chainId]

        console.log(`Indexer: Running Job from ${fromBlock}`)

        const web3 = new Web3(rpc)
        const whirlExtension = new web3.eth.Contract(WhirlExtension.abi, whirlExtensionId)

        const latestBlock = await web3.eth.getBlockNumber()
        console.log('Whirl Extension Indexer: Lastest Block ', latestBlock)

        if (fromBlock == latestBlock) return

        whirlExtension.getPastEvents('NFTMinted', { filter: {}, fromBlock: fromBlock, toBlock: 'latest' }, function (error, events) {
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
                    tokenId: event.returnValues.tokenId,
                    chainId: chainId,
                    tokenUri: event.returnValues.tokenUri,
                    owner: event.returnValues.owner
                }

                eventController.insertOrUpdate(eventModel)
            }
        })

        fs.writeFileSync('jobs/whirl-extension.indexer.json', JSON.stringify(
            {
                startBlocks: {
                    20201022: latestBlock
                }
            }
        ))

        console.log('Whirl Extension Indexer: Ending Job')
    } catch (error) {
        console.error(error)
        if (!job.running) {
            job.start()
        }
    }
})

job.start()