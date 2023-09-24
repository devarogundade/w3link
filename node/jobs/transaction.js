const CronJob = require('cron').CronJob
const eventController = require('../controllers/event.controller')

const job = new CronJob('0 */1 * * * *', function () {
    try {
        eventController.commit()
    } catch (error) {
        console.error(error)
        if (!job.running) {
            job.start()
        }
    }
})

job.start()