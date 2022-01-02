const { dataToken } = require("../helpers");
const ProfileModel = require("../models/profile.model");

class profileController {
  static async getProfile(req, res) {
    const { data } = dataToken(req, res);
    try {
      const UID = data._id;
      const profile = await ProfileModel.findOne({ _id: UID }, { _id, nama, email, no_hp, umur, jeniskelamin, berat, tinggi });
      res.send(profile);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
}
