const express = require("express");
const RekomendasiController = require("../controllers/rekomendasi.controller");
// const { dataToken, allowedUser, verifyToken } = require("../helpers");
const router = express.Router();

router.post("/", RekomendasiController.AddRekomendasi);
router.get("/", RekomendasiController.getRekomendasi);

module.exports = router;
