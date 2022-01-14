const mongoose = require("mongoose");

const rekomendasiSchema = new mongoose.Schema(
	{
		namarekomendasi: {
			type: String,
			maxlength: 40,
		},
		menu: [
			{
				idmakanan: {
					type: mongoose.Types.ObjectId,
					ref: "Food",
				},
				jumlah: {
					type: Number,
				},
			},
		],
		nutrisi: {
			karbohidrat: {
				type: Number,
			},
			protein: {
				type: Number,
			},
			kalori: {
				type: Number,
			},
			lemak: {
				type: Number,
			},
			karbon: {
				type: Number,
			},
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const RekomendasiModel = mongoose.model("Rekomendasi", rekomendasiSchema);
module.exports = RekomendasiModel;
