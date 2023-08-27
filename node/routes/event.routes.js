module.exports = app => {
    const controller = require("../controllers/event.controller.js")
    const router = require("express").Router()

    // create events
    router.post("/events", controller.create)

    // read events
    router.get("/api/events", controller.findAll)
    router.get("/api/events/:id", controller.findOne)

    app.use("/", router);
};