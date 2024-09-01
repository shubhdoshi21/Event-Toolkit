const mongoose = require("mongoose");
const {Schema} = mongoose;

const vendorSchema = new Schema({

    serviceName:{
        type:String,
        required: true,
        trim: true,
    },


    location:{
        type:String,
        required: true,
        trim: true,
    },


    about:{
        type:String,
        required:true,
        trim:true,
    },


    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reviews"
    }],


    packages:[{
        type:Schema.Types.ObjectId,
        ref:"Package"
    }],


    gallery:[{
        type:String,
    }],
  

},
{
    timestamps: true, 
  }
);
const Vendor = mongoose.model("Vendor",vendorSchema)
module.exports = {Vendor};