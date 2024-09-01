const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    hasHappened:{
        type:Boolean,
    },
    eventImages:[{
        type:String,
    }],
    caterer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Caterer",
    },
    decorator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Decorator",
    },
    photographer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Photographer",
    },
    cost:{
        type:Number,
    },
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venues",
    } 
});

module.exports = mongoose.model("Registration",registrationSchema);