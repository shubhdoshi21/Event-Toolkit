const express = require("express");
const router = express.Router();
const { getReviewsByType, postReview } = require("../controllers/reviews.controller.js");

router.post("/getReviewsByType", getReviewsByType);
router.post("/postReview", postReview);

module.exports = router;
