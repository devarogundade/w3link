const db = require("../models");
const { processEvent } = require('../processer');
const { dispatch } = require('./../event/listener.event')

const Event = db.event;

// Retrieve all Event from the database.
exports.findAll = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const count = await Event.countDocuments();

    Event.find(req.query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ nonce: 'desc' })
        .then(data => {
            res.json({
                data,
                totalPages: Math.ceil(count / limit),
                total: count,
                currentPage: page
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err || "Some err occurred."
            })
        })
};

// Retrieve one Event from the database.
exports.findOne = (req, res) => {
    Event.findOne({
        $or: [
            { bridgeHash: req.params.id },
            { fromHash: req.params.id },
            { toHash: req.params.id }
        ]
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            event: err || "Some err occurred."
        })
    })
};


/////////////////////////

dispatch(11155111, (error, event) => {
    console.log(error, event);
}, 123456, undefined)


//  // Save Event to database
//  Event.findOneAndUpdate(
//     { fromHash: event.fromHash },
//     { $set: event },
//     {
//         upsert: true,
//         returnNewDocument: true,
//         returnDocument: "after"
//     }).then(data => {
//         res.send(data)
//     }).catch(err => {
//         res.status(500).send({
//             message: err || "Some err occurred."
//         })
//     })

exports.commit = async () => {
    // order by nonce - asc
    const unProcessedEvent = await Event.findOne({ status: 'DISPATCHED' })
    if (!unProcessedEvent) return

    // Save Event to database
    Event.findOneAndUpdate(
        { fromHash: unProcessedEvent.fromHash },
        { $set: { status: 'PROCESSING' } },
        {
            upsert: false,
            returnNewDocument: true,
            returnDocument: "after"
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err);
        })

    const txHash = await processEvent(unProcessedEvent)
    const update = {}

    if (txHash) {
        update.toHash = txHash
        update.status = 'DELIVERED'
        update.deliveredTimestamp = Date.now()
    } else {
        update.status = 'FAILED'
    }

    // Save Event to database
    Event.findOneAndUpdate(
        { fromHash: unProcessedEvent.fromHash },
        { $set: update },
        {
            upsert: false,
            returnNewDocument: true,
            returnDocument: "after"
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err);
        })
}