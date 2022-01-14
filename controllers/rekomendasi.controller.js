const RekomendasiModel = require("../models/rekomendasi.model");
const FoodModel = require("../controllers/food.controller");

class RekomendasiController {
	static async AddRekomendasi(req, res) {
		try {
			let { namarekomendasi, menu, nutrisi } = req.body;
			const Rekomendasi = new RekomendasiModel({
				namarekomendasi: namarekomendasi,
				menu: menu,
				nutrisi: nutrisi,
			});
			const saved = await Rekomendasi.save();
			res.status(200).send(saved);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
	static async getRekomendasi(req, res) {
		try {
			const Rekomendasi = await RekomendasiModel.find().populate({
				path: "menu",
				populate: "idmakanan",
			});
			res.send(Rekomendasi);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
module.exports = RekomendasiController;
