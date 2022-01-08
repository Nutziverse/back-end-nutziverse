const { dataToken } = require("../helpers");
const TrackingModel = require("../models/tracking.model");

const getTracking = async (req, res) => {
  const {data} = dataToken(req, res)
  const UID = data._id
  try {
    const tracking = await TrackingModel.findOne({userID: UID})
    
    res.send(tracking)
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

const addTracking = async (req, res) => {
  const {data} = dataToken(req, res)
  const UID = data._id
  try {
    const trackingExist = await TrackingModel.findOne({userID: UID})

    if(trackingExist) {
      // cek if there's date now in makanan tanggal
    } else {
      // add new tracking
    }
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  getTracking,
  addTracking
}