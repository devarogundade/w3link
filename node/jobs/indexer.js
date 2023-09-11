const CronJob = require('cron').CronJob
const { newHash } = require('../utils/event-decoder')
const { w3linkIds, PegoTestnet, rpcs } = require('../configs/chains.config')
const eventController = require('../controllers/event.controller')
const W3Link = require('../abis/W3Link.json')
const Web3 = require('web3')

// @dev This listener is create for Pego Network Only

let fromBlock = 0
let latestBlock = 0

const job = new CronJob('0 */1 * * * *', async function () {
    const web3 = new Web3(rpcs[PegoTestnet])
    const w3link = new web3.eth.Contract(W3Link.abi, w3linkIds[PegoTestnet])

    latestBlock = await web3.eth.getBlockNumber()

    if (fromBlock == latestBlock) return

    w3link.getPastEvents('Dispatch', {filter: {}, fromBlock: fromBlock, toBlock: 'latest'}, function (error, events) {
        if (error) {
            console.error(error)
            return
        }

        for (let index = 0; index < events.length; index++) {
            const event = events[index]
            
            const eventModel = {
                fromHash: event.transactionHash,
                hash: event.returnValues.hash,
                destContractId: event.returnValues.destContractId,
                fromContractId: event.returnValues.fromContractId,
                destChainId: event.returnValues.destChainId,
                bridgeFee: event.returnValues.fee,
                data: event.returnValues.data,
                extra: event.returnValues.extra,
                dispatchTimestamp: Date.now(),
                bridgeHash: newHash()
            }
            
            eventController.create2(eventModel)
        }
    })

    fromBlock = latestBlock
})

job.start()