const FoodModel = require("../models/food.model");

const getAll = async (req, res) => {
  try {
    const food = await FoodModel.find()

    res.send(food)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getByID = async (req, res) => {
  const {id} = req.params
  try {
    const food = await FoodModel.findOne({_id: id})
    
    res.send(food)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

// not fix
const searchFood = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAll,
  getByID,
  searchFood
}