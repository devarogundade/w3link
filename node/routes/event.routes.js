module.exports = app => {
    const controller = require("../controllers/event.controller.js")
    const router = require("express").Router()

    // create
    router.post('/events/create', controller.create)

    // read events
    router.get("/events", controller.findAll)
    router.get("/events/:id", controller.findOne)

    app.use("/api", router);
};