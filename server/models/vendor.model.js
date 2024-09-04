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
    venue:[{
        type:Schema.Types.ObjectId,
        ref:"Venues",required:true
    }],

    gallery:[{
        type:String,
    }],
    vendorType:{
        type: String,
        enum: ["caterer", "photographer", "decorator"],
        
        required: true,
      },
    booking:{
        type:String,
        required:true,
        trim:true,
    },
    cancellation:{
        type:String,
        required:true,
        trim:true,
    },
    terms:{
        type:String,
        required:true,
        trim:true,
    },
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venues",
        required:true,
    }

},
{
    timestamps: true, 
  }
);
const Vendor = mongoose.model("Vendor",vendorSchema)
module.exports = {Vendor};