const express = require("express")
const TrackingController = require("../controllers/tracking.controller")
const { verifyToken, allowedUser } = require("../helpers")

const TrackingRouter = express.Router()

TrackingRouter.get("/", [verifyToken, allowedUser], TrackingController.getTracking)
TrackingRouter.post("/", [verifyToken, allowedUser], TrackingController.addTracking)

module.exports = TrackingRouter