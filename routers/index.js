const express = require("express");
const userRoutes = require("./users.router");
const adminRoutes = require("./admin.router");
const AkunRoute = require("./akun.router");
const ProfileRoute = require("./profile.router");
const ResepRoute = require("./resep.router");
const FoodRouter = require("./food.router");
const TrackingRouter = require("./tracking.router");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/profile", ProfileRoute);
router.use("/akun", AkunRoute);
router.use("/resep", ResepRoute);
router.use("/food", FoodRouter);
router.use("/tracking", TrackingRouter);

module.exports = router;
