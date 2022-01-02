const { dataToken } = require("../helpers");
const UserModel = require("../models/users.model");

const getProfile = async (req, res) => {
  const { data } = dataToken(req, res);
  try {
    const UID = data._id;
    const profile = await UserModel.findOne({ _id: UID }, { _id: 0, nama: 1, email: 1, no_hp: 1, umur: 1, jeniskelamin: 1, berat: 1, tinggi: 1 });
    res.send(profile);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
module.exports = getProfile;
