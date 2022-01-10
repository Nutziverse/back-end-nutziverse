const express = require("express");
const { verifyToken, allowedUser } = require("../helpers");
const { getMakanan } = require("../controllers/pilihmakanan.controller");
const { getByID } = require("../controllers/food.controller");
const router = express.Router();

router.get("/", [verifyToken, allowedUser], getMakanan);
router.get("/:id", [verifyToken, allowedUser], getByID);

module.exports = router;
