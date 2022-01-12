const mongoose = require("mongoose")

const opts = {
  timestamps: true,
  versionKey: false
}

const TrackingMakananSchema = new mongoose.Schema({
  tanggal : {
    type: Date,
    required: true,
  },
  makanan: [{
    makananID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Food"
    },
    porsi: {
      type: Number,
      required: true
    },
    jam: {
      type: String,
      required: true
    }
  }, {_id: false}],
  totKalori: {
    type: Number
  },
  totKarbon: {
    type: Number
  }
}, {_id: false})

const TrackingSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  tracking: [TrackingMakananSchema],
  kendaraan: {
    type: Number
  },
  serapEmisi: {
    type: Number,
    default: 0
  }

}, opts)

const TrackingModel = mongoose.model("TrackingNutrisi", TrackingSchema)
module.exports = TrackingModel