const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    venueName: {type: String, required: true},
    venueDescription: {type: String, required: true}, 
    venueCity: {type: String, required: true}
})

const Venues = mongoose.model("Venues", venueSchema);
module.exports= {Venues}