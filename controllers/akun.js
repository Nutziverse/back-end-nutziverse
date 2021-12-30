
// import user model

// get user id
const getAkun = async (req, res) => {
  try {
    // get by user id
    const akun = null

    res.send(akun)
    
  } catch (error) {
    res.status(500).send({error: error})
  }
}

const editAkun = async (req, res) => {
  const data = req.body
  try {
    // edit akun user by id
    // const updated = await UserModel.findOneAndUpdate({_id: UID}, data, {new: true})
    const updated = null

    res.send({
      message: "data akun berhasil diedit",
      akun: updated
    })
  } catch (error) {
    res.status(500).send({error: error})
  }
}

module.exports = {
  getAkun,
  editAkun
}