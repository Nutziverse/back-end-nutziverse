const ProfileModel = require("../models/profile.model");

class profileController {
  static async getProfile(req, res) {
    try {
      const profile = await ProfileModel.find();
      res.send(profile);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
}
