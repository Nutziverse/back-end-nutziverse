const { dataToken } = require("../helpers");
const TrackingModel = require("../models/tracking.model");

const getTracking = async (req, res) => {
  const {data} = dataToken(req, res)
  const UID = data._id
  try {
    const tracking = await TrackingModel.findOne({userID: UID}).populate({
      path: 'tracking',
      populate: {
        path: 'makanan',
        populate: 'makananID'
      }
    })
    
    res.send(tracking)
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

const addTracking = async (req, res) => {
  const {data} = dataToken(req, res)
  const UID = data._id
  const {makanan, totKalori, totKarbon} = req.body

  try {
    const trackingExist = await TrackingModel.findOne({userID: UID})

    if(trackingExist) {
      // cek if there's date now in makanan tanggal
      let today = new Date()
      today = today.toISOString().split('T')[0]

      const trackingIndex = trackingExist.tracking.findIndex(el => el.tanggal.toISOString().includes(today))
      console.log(trackingIndex);

      // jika sudah terdapat history makanan di hari ini
      if(trackingIndex > -1) {
        makanan.map(item => trackingExist.tracking[trackingIndex].makanan.push(item))
        trackingExist.tracking[trackingIndex].totKalori += totKalori
        trackingExist.tracking[trackingIndex].totKarbon += totKarbon
        
        await trackingExist.save()
      } 
      // jika belum terdapat history makanan di hari ini
      else {
        const tracking = {
          tanggal: new Date(),
          makanan: makanan,
          totKalori: totKalori,
          totKarbon: totKarbon
        }

        trackingExist.tracking.push(tracking)
        trackingExist.save()
      }

      res.send({message: 'success'})
    } else {
      const tracking = {
        tanggal: new Date(),
        makanan: makanan,
        totKalori: totKalori,
        totKarbon: totKarbon
      }
      
      const newTracking = {
        userID: UID,
        tracking: [tracking],
        kendaraan: 10
      }

      const saved = new TrackingModel(newTracking)
      await saved.save()

      res.send({message: "Success"})
    }
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  getTracking,
  addTracking
}