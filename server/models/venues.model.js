const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  venueName: { type: String, required: true },
  venueDescription: { type: String, required: true },
  venueCity: { type: String, required: true },
  venueImage: { type: String, required: true },
  venueImageName: { type: String, required: true },
  subVenues: [
    {
      subVenueName: { type: String, required: true },
      subVenueDescription : { type: String, required: true },
      subVenuePrice: { type: Number, required: true },
      subVenueImage: { type: String, required: true },
      subVenueImageName: { type: String, required: true },
    },
  ],
});

const Venues = mongoose.model("Venues", venueSchema);
module.exports = { Venues };

//bug at venues at city in home --fixed
