const express = require("express");
const editProfil = require("../controllers/editprofil.controller");
const { allowedAdmin, verifyToken, allowedUser } = require("../helpers");

const router = express.Router();

router.patch("/", [verifyToken, allowedUser], editProfil);

module.exports = router;
