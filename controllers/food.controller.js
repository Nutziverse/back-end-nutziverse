const FoodModel = require("../models/food.model");

const getAll = async (req, res) => {
	try {
		const food = await FoodModel.find();
		res.send(food);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getByID = async (req, res) => {
	const { id } = req.params;
	try {
		const food = await FoodModel.findOne({ _id: id });

		res.send(food);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

//for admin only
const addFood = async (req, res) => {
	try {
		const newFood = req.body;
		const createFood = new FoodModel(newFood);
		await createFood.save();

		res.send({ message: "Success" });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const editFood = async (req, res) => {
	try {
		const { id } = req.params;
		const updateFood = req.body;

		if (Object.keys(updateFood).length === 0) {
			res.send({ message: "Nothing to update" });
		} else {
			const updated = await FoodModel.updateOne({ _id: id }, updateFood);
			res.send({ message: "Success", updated });
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const getMultipleFood = async (req, res) => {
	try {
		const id = req.body.idmakanan;
		const data = await FoodModel.find({ _id: { $in: id } });
		res.status(200).send(data);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	getAll,
	getByID,
	addFood,
	editFood,
	getMultipleFood,
};
