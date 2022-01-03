const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		nama: {
			type: String,
			maxlength: 100,
		},
		email: {
			type: String,
			maxlength: 150,
		},
		jeniskelamin: {
			type: String,
			enum: ["laki-laki", "perempuan"],
			maxlength: 9,
		},
		aktivitasFisik: {
			type: Number,
			maxlength: 3,
		},
		tinggi: {
			type: Number,
			maxlength: 3,
		},
		berat: {
			type: Number,
			maxlength: 3,
		},
		no_hp: {
			type: String,
			maxlength: 14,
		},
		umur: {
			type: Number,
			maxlength: 3,
		},
		password: {
			type: String,
			maxlength: 255,
		},
		tracking_nutrisi: {
			type: mongoose.Types.ObjectId,
			ref: "Tracking",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
