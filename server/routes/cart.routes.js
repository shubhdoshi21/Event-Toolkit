const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  fetchCart,
  fetchCartTotalPrice,
  clearCart,
} = require("../controllers/cart.controller");

router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);
router.post("/fetchCart", fetchCart);
router.get("/fetchPrice", fetchCartTotalPrice);
router.post("/clear-cart", clearCart);

module.exports = router;
