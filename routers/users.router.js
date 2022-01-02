const express = require("express")

const usersController = require("../controllers/users.controller")

const router = express.Router()

const {verifyToken, verifyTokenWithId} = require("../helpers")

router.post("/register",usersController.registerUser)
router.post("/login",usersController.loginUser)



module.exports = router