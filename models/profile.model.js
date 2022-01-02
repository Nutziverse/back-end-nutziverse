const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  nama: {
    type: String,
    maxlength: 100,
  },
  email: {
    type: String,
    maxlength: 150,
  },
  jeniskelamin: {
    enum: ["laki-laki", "perempuan"],
    maxlength: 9,
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
});
