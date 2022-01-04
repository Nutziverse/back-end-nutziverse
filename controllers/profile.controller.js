const { dataToken } = require("../helpers");
const UserModel = require("../models/users.model");

const getProfile = async (req, res) => {
  const { data } = dataToken(req, res);
  try {
    const UID = data._id;
    const profile = await UserModel.findOne({ _id: UID });
    res.send(profile);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
module.exports = getProfile;
