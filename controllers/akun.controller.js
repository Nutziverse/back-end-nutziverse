// import user model
const { dataToken } = require("../helpers")
const UserModel = require("../models/users.model")
const bcrypt = require("bcrypt")
const saltRounds = 10

const getAkun = async (req, res) => {
  const { data } = dataToken(req, res);

  try {
    // get by user id
    const UID = data._id
    let akun = await UserModel.findOne({_id: UID}, {_id: 0, email: 1, no_hp: 1, password: 1})

    if(akun.email) {
      akun = {
        email: akun.email
      }
    } else {
      akun = {
        no_hp: akun.no_hp
      }
    }
    
    res.send(akun)
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const editAkun = async (req, res) => {
  const { data } = dataToken(req, res);
  const updateData = req.body;

  try {
    // edit akun user by id
    const UID = data._id
    
    if(updateData.email) {
      return res.status(400).send({
        message: "Ooops, maaf. Anda tidak dapat mengedit email login dengan google"
      })
    } else {
      if(updateData.no_hp) {
        // cek apakah nomor hp sudah terdaftar pada user lain atau user yang sama
        const isExist = await UserModel.findOne({no_hp: updateData.no_hp})
        
        if(isExist) {
          return res.status(400).send({
            message: "Maaf, nomor hp sudah terdaftar."
          })
        }
        
        const updated = await UserModel.findOneAndUpdate({_id: UID}, updateData, {new: true}).select({_id: 0, no_hp: 1})
        
        return res.send({
          message: "data akun berhasil diedit",
          // akun: updated
          akun: updated
        })
      } else {
        return res.status(400).send({
          message: "Maaf, data harus terisi"
        })
      }
    }
    
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

const changePassword = async (req, res) => {
  const {data} = dataToken(req, res)
  const updateData = req.body
  
  try {
    const UID = data._id
    let statusCode = 201
    let message

    if(updateData.current_password && updateData.new_password && updateData.confirm_password) {
      const akun = await UserModel.findOne({_id: UID}, {_id: 0, password: 1})

      let compare = bcrypt.compareSync(updateData.current_password, akun.password)

      if(compare) {
        if(updateData.new_password !== updateData.confirm_password) {
          statusCode = 400
          message = "Konfirmasi password salah"
        } else {
          let new_password = bcrypt.hashSync(updateData.new_password, saltRounds)
          await UserModel.findOneAndUpdate({_id: UID}, {password: new_password})
          message = "password berhasil diubah"
        }
      } else {
        statusCode = 401
        message = "Password salah"
      }
    } else {
      statusCode = 400
      message = "Maaf, request tidak dapat diproses karna terdapat data yang kurang. Mohon cek kembali input anda"
    }

    res.status(statusCode).send({
      message: message
    })
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAkun,
  editAkun,
  changePassword
}