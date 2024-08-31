const express = require("express");
const router = express.Router();
const { getAllReviews, postReview } = require("../controllers/reviews.controller.js");

router.get("/getAllReviews", getAllReviews);
router.post("/postReview", postReview);

module.exports = router;
