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
  },
  porsi: {
    type: String,
    maxlength: 20,
    required: true
  },
  penyetaraanPorsi: {
    type: String,
    maxlength: 15,
    required: true
  }
}, opts)

const FoodModel = mongoose.model("Food", FoodSchema)
module.exports = FoodModel