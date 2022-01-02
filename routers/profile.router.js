const express = require("express");
const profileController = require("../controllers/profile.controller");
const { verifyToken, allowedUser } = require("../helpers");
const router = express.Router();

router.get("/profile", [verifyToken, allowedUser], profileController.getProfile);

const ProfileModel = mongoose.model("Profile", profileSchema);
module.exports = ProfileSchema;
