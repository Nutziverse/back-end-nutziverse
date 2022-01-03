const express = require("express");
const getProfile = require("../controllers/profile.controller");
const { verifyToken, allowedUser } = require("../helpers");
const router = express.Router();

router.get("/", [verifyToken, allowedUser], getProfile);

// const ProfileModel = mongoose.model("Profile");
module.exports = router;
