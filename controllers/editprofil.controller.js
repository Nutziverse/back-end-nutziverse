const { dataToken } = require("../helpers");
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");

const editProfil = async (req, res) => {
  const { data } = dataToken(req, res);
  const updateData = req.body;

  try {
    const UID = data._id;
    const editProfile = await UserModel.findOneAndUpdate({ _id: UID }, updateData);
    res.send(editProfile);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
module.exports = editProfil;
