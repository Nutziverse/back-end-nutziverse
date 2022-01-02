const express = require("express")
const AkunController = require("../controllers/akun.controller")
const { verifyToken, allowedUser } = require("../helpers")

const AkunRoute = express.Router()

AkunRoute.get("/", [verifyToken, allowedUser], AkunController.getAkun)
AkunRoute.patch("/", [verifyToken, allowedUser], AkunController.editAkun)

module.exports = AkunRoute