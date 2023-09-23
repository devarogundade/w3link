const CronJob = require('cron').CronJob
const { whirlId, chainId, rpc, startBlock, whirlExtensionId } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const WhirlExtension = require('../abis/WhirlExtension.json')
const Web3 = require('web3')

// @dev This listener is create for Pego Network Only

let fromBlock = startBlock

const job = new CronJob('0 */1 * * * *', async function () {
    console.log('Indexer: Running Job')

    const web3 = new Web3(rpc)
    const whirlExtension = new web3.eth.Contract(WhirlExtension.abi, whirlExtensionId)

    const latestBlock = await web3.eth.getBlockNumber()
    console.log('Indexer: Lastest Block ', latestBlock)

    if (fromBlock == latestBlock) return

    whirlExtension.getPastEvents('NFTMinted', {filter: {}, fromBlock: fromBlock, toBlock: 'latest'}, function (error, events) {
        console.log('Indexer: Error ', error)
        console.log('Indexer: Events ', events)

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
                owner: event.returnValues.owner.toLowercase()
            }
            
            eventController.insertOrUpdate(eventModel)
        }
    })

    fromBlock = latestBlock

    console.log('Indexer: Ending Job')
})

job.start()