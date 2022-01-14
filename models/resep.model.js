const mongoose = require("mongoose");

const ResepSchema = new mongoose.Schema({
  porsi: {
    type: Number,
  },
  image: {
    type: String,
    maxlength: 255,
    required: true,
  },
  deskripsi: {
    type: String,
  },
  bahan: [{ type: String }],
  waktupenyajian: {
    type: String,
  },
  idMakanan: {
    type: mongoose.Types.ObjectId,
    ref: "FoodModel",
  },
});
const ResepModel = mongoose.model("Resep", ResepSchema);
module.exports = ResepModel;
