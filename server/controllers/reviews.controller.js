const { Reviews } = require("../models/reviews.model.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

const getReviewsByType = asyncHandler(async (req, res) => {
  try {
    const reviews = await Reviews.find({
      reviewType: req.body.reviewType ? req.body.reviewType : null,
    }).populate("userId", {
      firstName: 1,
      lastName: 1,
    });

    if (reviews.length === 0) {
      throw new ApiError(404, "No reviews found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { data: reviews }, "Reviews found"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
});

const postReview = asyncHandler(async (req, res) => {
  try {
    const { rating, review } = req.body;
  
    if (!rating) {
      throw new ApiError(400, "Rating is required");
    }

    if(req.body.reviewType){
      if(!req.body.relatedId) throw new ApiError(400, "Refernce id is required");
    }
  
    const newReview = new Reviews({
      userId: req.body.id,
      rating,
      review,
      reviewType: req.body.reviewType ? req.body.reviewType : null,
      relatedId:
        req.body.reviewType && req.body.relatedId ? req.body.relatedId : null,
    });
  
    await newReview.save();
  
    return res
      .status(201)
      .json(
        new ApiResponse(201, { data: newReview }, "Review posted successfully")
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
});

module.exports = {
  getReviewsByType,
  postReview,
};
