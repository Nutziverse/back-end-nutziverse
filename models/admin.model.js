const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        maxlength: 250    
    },
    password: {
        type: String,
        maxlength: 255
    } 
}, {
    timestamps: true,
    versionKey: false
})


const AdminModel = mongoose.model("Admin", adminSchema)
module.exports = AdminModel