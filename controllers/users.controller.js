const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken, verifyToken } = require("../helpers");
const loginByGoogle = require("../helpers/google.auth");

class UsersController {
  static async registerUser(req, res) {
    try {
      let { nama, email, jeniskelamin, tinggi, berat, umur, no_hp, password } = req.body;
      const emailExist = await UsersModel.findOne({ email: email });
      if (emailExist === null) {
        password = bcrypt.hashSync(password, saltRounds);
        const users = new UsersModel({
          nama: nama,
          email: email,
          jeniskelamin: jeniskelamin,
          tinggi: tinggi,
          berat: berat,
          umur: umur,
          no_hp: no_hp,
          password: password,
        });
        const saved = await users.save();
        res.status(201).send(saved);
      } else {
        res.send("duplicate email");
      }
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async loginUser(req, res) {
    try {
      let { email, no_hp, password } = req.body;
      const existUseremail = await UsersModel.findOne({ email: email });
      const existUserno_hp = await UsersModel.findOne({ no_hp: no_hp });
      if (existUseremail !== null || existUserno_hp !== null) {
        let compare = bcrypt.compareSync(password, existUseremail.password);
        if (compare) {
          const tokenUser = {
            _id: existUseremail._id,
            role: "user",
          };
          const createToken = generateToken(tokenUser);
          res.status(200).send({ message: "welcome", token: createToken });
        } else {
          res.send("invalid");
        }
      } else {
        res.send("user is not exist");
      }
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
  static async loginByGoogle(req, res) {
    try {
      const profile = req.body.profileObj;
      console.log(profile);

      UsersModel.create({
        nama: profile.name,
        email: profile.email,
      })
        .then((result) => {
          console.log(result);
          res.status(200).send({
            message: "success",
            result,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({
            message: "error",
            error,
          });
        });
    } catch (e) {
      console.log(e);
      res.status(401).send();
    }
  }
}

module.exports = UsersController;
