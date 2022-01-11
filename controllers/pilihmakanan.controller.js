const { dataToken } = require("../helpers");
const FoodModel = require("../models/food.model");
const bcrypt = require("bcrypt");
const { getByID } = require("./food.controller");

const getMakanan = async (req, res) => {
  const { data } = dataToken(req, res);
  try {
    //get all makanan
    let makanan = await FoodModel.find({}).select({ makanan: 1, penyetaraanPorsi: 1, kaloriMakanan: 1, karbon: 1 });
    res.send(makanan);
  } catch (error) {
    res.status(500);
    res.send(error);
  }

  // const getByID = async (req, res) => {
  //   const { data } = dataToken(req, res);
  //   try {
  //     const MID = data._id; //MID MakananID
  //     let pilihmakanan = await FoodModel.findOne({ _id: MID });
  //     res.send(pilihmakanan);
  //   } catch (error) {
  //     res.status(500);
  //     res.send(error);
  //   }
  // };
};

module.exports = { getMakanan: getMakanan, getByID: getByID };
