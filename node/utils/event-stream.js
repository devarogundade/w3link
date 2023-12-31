const decoder = require('./event-decoder.js')

exports.toEvents = (request) => {
    const webhook = request.body
    
    if (!webhook || !webhook.logs || webhook.confirmed) return null
    
    const objects = []
    const collection = webhook.tag

    try {
        for (const log of webhook.logs) {
            const format = decoder.dispatchFormat(collection)

            // abi format does not exists for event data
            if (format == null || typeof format === 'undefined') continue

            const hash = log.transactionHash
            const data = decoder.decodeLog(format, log.data)

            // object is invalid
            const object = decoder.toDisptachModel(collection, data, hash, Number(webhook.chainId))
            if (object == null || typeof object === 'undefined') continue

            objects.push(object)
        }
        return objects
    } catch (error) {
        console.error(error);
        return null
    }
}