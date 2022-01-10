const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken, verifyToken } = require("../helpers");

class UsersController {
	static async registerUser(req, res) {
		try {
			let {
				nama,
				email,
				jeniskelamin,
				tinggi,
				berat,
				umur,
				no_hp,
				password,
				aktivitasFisik,
				gizi,
				kaloriYgDibutuhkan,
			} = req.body;
			aktivitasFisik = Number(aktivitasFisik);
			const emailExist = await UsersModel.findOne({ email: email });
			let keterangan = "";
			if (emailExist === null) {
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
					email: email,
					jeniskelamin: jeniskelamin,
					tinggi: tinggi,
					berat: berat,
					umur: umur,
					aktivitasFisik: aktivitasFisik,
					no_hp: no_hp,
					password: password,
					gizi,
					kaloriYgDibutuhkan,
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
}

module.exports = UsersController;
