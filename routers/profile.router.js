const express = require("express");
const profileController = require("../controllers/profile.controller");
const router = express.Router();

router.get("/profile", profileController.profileController);

const ProfileModel = mongoose.model("Profile", profileSchema);
module.exports = ProfileSchema;
