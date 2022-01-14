const express = require("express");
const ResepController = require("../controllers/resep.controller");
const { verifyToken, allowedAdmin } = require("../helpers");
const router = express.Router();

router.get("/", ResepController.getResep);
router.get("/:id", ResepController.getResepByID);
router.post("/", [verifyToken, allowedAdmin], ResepController.postResep);

module.exports = router;
