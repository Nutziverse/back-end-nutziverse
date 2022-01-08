const express = require("express");
const ResepController = require("../controllers/resep.controller");
const { dataToken, allowedUser, verifyToken } = require("../helpers");
const router = express.Router();

router.get("/", [verifyToken, allowedUser], ResepController.getResep);
router.get("/:id", [verifyToken, allowedUser], ResepController.getResepByID);
router.post("/", [verifyToken, allowedUser], ResepController.postResep);

module.exports = router;
