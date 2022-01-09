const express = require("express");
// const wishlistrouter = require("./wishlist");
// const reviewrouter = require("./review");
const userRoutes = require("./users.router");
const adminRoutes = require("./admin.router");
// const productsRouter = require("./products")
// const cartRouter = require("./cart")
// const historyRouter = require("./history")
const AkunRoute = require("./akun.router");
const ProfileRoute = require("./profile.router");
const ResepRoute = require("./resep.router");
const FoodRouter = require("./food.router");
const PilihMakananRouter = require("./pilihmakanan.router");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

// router.use("/history", historyRouter)
// router.use("/products", productsRouter)
// router.use("/cart", cartRouter)
// router.use("/wishlist", wishlistrouter);
// router.use("/review", reviewrouter);
router.use("/profile", ProfileRoute);
router.use("/akun", AkunRoute);
router.use("/resep", ResepRoute);
router.use("/pilihmakanan", PilihMakananRouter);
router.use("/food", FoodRouter);

module.exports = router;
