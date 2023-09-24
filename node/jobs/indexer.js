const CronJob = require('cron').CronJob
const { newHash } = require('../utils/event-decoder')
const { w3linkIds, PegoTestnet, rpcs } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const W3Link = require('../abis/W3Link.json')
const Web3 = require('web3')
const fs = require('fs')

// @dev This listener is create for Pego Network Only

const job = new CronJob('*/30 * * * * *', async function () {
    try {
        const data = fs.readFileSync('jobs/config.indexer.json', "utf-8")
        const json = JSON.parse(data)
      
        const fromBlock = json.startBlocks[PegoTestnet]

        console.log(`Indexer: Running Job from ${fromBlock}`)

        const web3 = new Web3(rpcs[PegoTestnet])
        const w3link = new web3.eth.Contract(W3Link.abi, w3linkIds[PegoTestnet])

        const latestBlock = await web3.eth.getBlockNumber()
        console.log('Indexer: Lastest Block ', latestBlock)

        if (fromBlock == latestBlock) return

        w3link.getPastEvents('Dispatch', { filter: {}, fromBlock: fromBlock, toBlock: 'latest' }, function (error, events) {
            console.log('Indexer: Error ', error)
            console.log('Indexer: Events ', events)

            if (error) {
                console.error(error)
                return
            }

            for (let index = 0; index < events.length; index++) {
                const event = events[index]

                const eventModel = {
                    status: 'DISPATCHED',
                    fromHash: event.transactionHash,
                    hash: event.returnValues.hash,
                    destContractId: event.returnValues.destContractId,
                    fromContractId: event.returnValues.fromContractId,
                    destChainId: event.returnValues.destChainId,
                    fromChainId: PegoTestnet,
                    bridgeFee: event.returnValues.fee,
                    data: event.returnValues.data,
                    extra: event.returnValues.extra,
                    dispatchTimestamp: Date.now(),
                    bridgeHash: newHash()
                }

                eventController.create2(eventModel)
            }
        })

        fs.writeFileSync('jobs/config.indexer.json', JSON.stringify(
            {
                startBlocks: {
                    PegoTestnet: latestBlock
                }
            }
        ))

        console.log(`Indexer: Ending Job at ${latestBlock}`)
    } catch (error) {
        console.error(error)
        if (!job.running) {
            job.start()
        }
    }
})

job.start()