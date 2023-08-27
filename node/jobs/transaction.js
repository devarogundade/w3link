const CronJob = require('cron').CronJob
const eventController = require('../controllers/event.controller')

const job = new CronJob('0 */1 * * * *', function() {
    eventController.commit()
})

job.start()