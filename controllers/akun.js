
// import user model
const { dataToken } = require("../helpers")
const UserModel = require("../models/users.model")

const getAkun = async (req, res) => {
  const {data} = dataToken(req, res)
  
  try {
    // get by user id
    const UID = data._id
    const akun = await UserModel.findOne({_id: UID}, {_id: 0, email: 1, no_hp: 1, password: 1})
    
    res.send(akun)
    
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

const editAkun = async (req, res) => {
  const {data} = dataToken(req, res)
  const updateData = req.body
  
  try {
    // edit akun user by id
    const UID = data._id
    const updated = await UserModel.findOneAndUpdate({_id: UID}, updateData, {new: true})

    res.send({
      message: "data akun berhasil diedit",
      akun: updated
    })
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

module.exports = {
  getAkun,
  editAkun
}