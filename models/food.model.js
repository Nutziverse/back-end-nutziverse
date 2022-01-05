const mongoose = require("mongoose")

const opts = {
  timestamps: true,
  versionKey: false
}

const FoodSchema = new mongoose.Schema({
  makanan: {
    type: String,
    maxlength: 150,
    required: true
  },
  image: {
    type: String,
    maxlength: 255,
    required: true
  },
  penyetaraanPorsi: {
    value: {
      type: Number,
      required: true
    },
    satuan: {
      type: String,
      required: true
    }
  },
  kaloriMakanan: {
    type: Number,
    required: true
  },
  karbohidrat: {
    type: Number,
    required: true
  },
  protein: {
    type: Number, 
    required: true
  },
  lemak: {
    type: Number,
    required: true
  },
  karbon: {
    type: Number,
    required: true
  }
}, opts)

const FoodModel = mongoose.model("Food", FoodSchema)
module.exports = FoodModel