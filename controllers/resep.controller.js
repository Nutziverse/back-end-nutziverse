const { dataToken } = require("../helpers");
const ResepModel = require("../models/resep.model");

class ResepController {
  static async getResep(req, res) {
    try {
      const reseps = await ResepModel.find();
      res.send(reseps);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
  static async postResep(req, res) {
    try {
      const { porsi, image, deskripsi, idMakanan } = req.body;
      const Resep = new ResepModel({
        porsi: porsi,
        image: image,
        deskripsi: deskripsi,
        bahan: bahan,
        waktupenyajian: waktupenyajian,
        idMakanan: idMakanan,
      });
      console.log(Resep);
      const saved = await Resep.save();
      res.status(200);
      res.send(saved);
    } catch (error) {
      res.send(error);
    }
  }

  static async getResepByID(req, res) {
    try {
      const ID = req.params.id;
      const resep = await ResepModel.findById(ID);
      res.send(resep);
    } catch (error) {
      res.send({ message: error });
    }
  }
}
module.exports = ResepController;
