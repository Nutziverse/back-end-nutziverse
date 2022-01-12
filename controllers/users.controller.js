const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken, verifyToken } = require("../helpers");
const loginByGoogle = require("../helpers/google.auth");
const registerByGoogle = require("../helpers/google.auth");

class UsersController {
  static async registerUser(req, res) {
    try {
      let { nama, jeniskelamin, tinggi, berat, umur, no_hp, password, aktivitasFisik } = req.body;
      aktivitasFisik = Number(aktivitasFisik);
      const noHPExist = await UsersModel.findOne({ no_hp: no_hp });

      let keterangan = "";
      if (noHPExist === null) {
        switch (aktivitasFisik) {
          case 1.2:
            keterangan = "aktivitas rendah";
            break;
          case 1.3:
            keterangan = "aktivitas sedang";
            break;
          case 1.4:
            keterangan = "aktivitas rendah";
            break;
          default:
            keterangan = "aktivitas tidak ada";
            break;
        }
        aktivitasFisik = {
          keterangan: keterangan,
          nilai: aktivitasFisik,
        };
        password = bcrypt.hashSync(password, saltRounds);
        const users = new UsersModel({
          nama: nama,
          jeniskelamin: jeniskelamin,
          tinggi: tinggi,
          berat: berat,
          umur: umur,
          aktivitasFisik: aktivitasFisik,
          no_hp: no_hp,
          password: password,
        });
        const saved = await users.save();
        const tokenUser = {
          _id: saved._id,
          role: "user",
        };
        const createToken = generateToken(tokenUser);
        res.status(201).send({ message: "success", token: createToken });
      } else {
        res.send("duplicate email");
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
      let { email, no_hp, password } = req.body;
      const existUserno_hp = await UsersModel.findOne({ no_hp: no_hp });
      if (existUserno_hp !== null) {
        let compare = bcrypt.compareSync(password, existUserno_hp.password);
        if (compare) {
          const tokenUser = {
            _id: existUserno_hp._id,
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
      const { name, email } = profile;
      const users = new UsersModel({
        nama: nama,
        email: email,
      });
      const saved = await users.save();
      res.status(200).send(saved);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async loginByGoogle(req, res) {
    try {
      const profile = req.body.profileObj;
      const existUseremail = await UsersModel.findOne({ email: profile.email });

      if (existUseremail) {
        const tokenUser = {
          _id: existUseremail._id,
          role: "user",
        };
        const createToken = generateToken(tokenUser);
        res.send({ message: "welcome", token: createToken });
      } else {
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
      }
    } catch (e) {
      console.log(e);
      res.status(401).send();
    }
  }

  // registerByGoogle

  static async registerByGoogle(req, res) {
    try {
      const profile = req.body.profileObj;
      const { name, email } = profile;
      const users = new UsersModel({
        nama: nama,
        email: email,
      });
      const saved = await users.save();
      res.status(200).send(saved);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  //registerByGoogle

  static async registerByGoogle(req, res) {
    try {
      let { email, berat, tinggi, jeniskelamin, umur, aktivitasFisik } = req.body;

      let keterangan;
      aktivitasFisik = Number(aktivitasFisik);
      switch (aktivitasFisik) {
        case 1.2:
          keterangan = "aktivitas rendah";
          break;
        case 1.3:
          keterangan = "aktivitas sedang";
          break;
        case 1.4:
          keterangan = "aktivitas rendah";
          break;
        default:
          keterangan = "aktivitas tidak ada";
          break;
      }
      aktivitasFisik = {
        keterangan: keterangan,
        nilai: aktivitasFisik,
      };

      const user = await UsersModel.findOneAndUpdate(
        { email: email },
        {
          jeniskelamin: jeniskelamin,
          berat: berat,
          tinggi: tinggi,
          umur: umur,
          aktivitasFisik: aktivitasFisik,
        }
      );

      const tokenUser = {
        _id: user._id,
        role: "user",
      };
      const createToken = generateToken(tokenUser);

      res.send({ message: "success", token: createToken });
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
}

module.exports = UsersController;
