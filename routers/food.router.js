const express = require("express")
const FoodController = require("../controllers/food.controller")
const { allowedAdmin, verifyToken } = require("../helpers")

const FoodRouter = express.Router()

FoodRouter.get("/", FoodController.getAll)
FoodRouter.get("/:id", FoodController.getByID)

module.exports = FoodRouter

