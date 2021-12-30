const express = require("express")
const AkunController = require("../controllers/akun")

const AkunRoute = express.Router()

AkunRoute.get("/", AkunController.getAkun)
AkunRoute.patch("/", AkunController.editAkun)

module.exports = AkunRoute