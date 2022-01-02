const express = require("express")
const AkunRoute = require("./akun.router")

const router = express.Router()

router.use("/akun", AkunRoute)

module.exports = router