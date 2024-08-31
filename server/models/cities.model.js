const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  cityImage: { type: String, required: true },
  cityImageName: { type: String, required: true },
  cityDescription: {type: String, required: true},
  venuesAtCity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venues",
    },
  ],
});

const Cities = mongoose.model("Cities", citySchema);
module.exports = {Cities}
