const CronJob = require('cron').CronJob
const { whirlId, chainId, rpc } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const Whirl = require('../abis/Whirl.json')
const Web3 = require('web3')
const fs = require('fs')

// @dev This listener is create for Pego Network Only

const job = new CronJob('*/20 * * * * *', async function () {
    try {
        const data = fs.readFileSync('jobs/whirl.indexer.json', "utf-8")
        const json = JSON.parse(data)

        const fromBlock = json.startBlocks[chainId]

        console.log(`Indexer: Running Job from ${fromBlock}`)

        const web3 = new Web3(rpc)
        const whirl = new web3.eth.Contract(Whirl.abi, whirlId)

        const latestBlock = await web3.eth.getBlockNumber()
        console.log('Whirl Indexer: Lastest Block ', latestBlock)

        if (fromBlock == latestBlock) return

        whirl.getPastEvents('NFTransferred', { filter: {}, fromBlock: fromBlock, toBlock: 'latest' }, function (error, events) {
            console.log('Whirl Indexer: Error ', error)
            console.log('Whirl Indexer: Events ', events)

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
                    owner: event.returnValues.to
                }

                eventController.insertOrUpdate(eventModel)
            }
        })

        fs.writeFileSync('jobs/whirl.indexer.json', JSON.stringify(
            {
                startBlocks: {
                    123456: latestBlock
                }
            }
        ))

        console.log('Whirl Indexer: Ending Job')
    } catch (error) {
        console.error(error)
        if (!job.running) {
            job.start()
        }
    }
})

job.start()