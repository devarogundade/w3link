const CronJob = require('cron').CronJob
const { whirlId, chainId, rpc, startBlock } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const Whirl = require('../abis/Whirl.json')
const Web3 = require('web3')

// @dev This listener is create for Pego Network Only

let fromBlock = startBlock

const job = new CronJob('0 */1 * * * *', async function () {
    console.log('Indexer: Running Job')

    const web3 = new Web3(rpc)
    const whirl = new web3.eth.Contract(Whirl.abi, whirlId)

    const latestBlock = await web3.eth.getBlockNumber()
    console.log('Indexer: Lastest Block ', latestBlock)

    if (fromBlock == latestBlock) return

    whirl.getPastEvents('NFTransferred', {filter: {}, fromBlock: fromBlock, toBlock: 'latest'}, function (error, events) {
        console.log('Indexer: Error ', error)
        console.log('Indexer: Events ', events)

        if (error) {
            console.error(error)
            return
        }

        for (let index = 0; index < events.length; index++) {
            const event = events[index]
            
            const eventModel = {
                tokenAddress: event.tokenAddress,
                tokenId: event.tokenId,
                chainId: chainId,
                owner: event.to
            }
            
            eventController.insertOrUpdate(eventModel)
        }
    })

    fromBlock = latestBlock

    console.log('Indexer: Ending Job')
})

job.start()