const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  review: { type: String },
  reviewType: {
    type: String,
    enum: ["Venues", "Vendor"],
  },
  relatedId: { type: mongoose.Schema.Types.ObjectId, refPath: 'reviewType' },
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = { Reviews };
