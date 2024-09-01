const Registration = require('../models/Registration.js');
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const User = require('../models/user.model.js');
const Vendor = require('../models/vendor.model.js')
const Package = require('../models/package.model.js');

exports.register = async(req,res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user){
            throw new ApiError(
                401,
                "Kindly login to register"
              );
        }
        const firstName = user.firstName;
        const lastName = user.lastName;
        const email = user.email;
        const {startDate, endDate, caterer, decorator, photographer, decPackId, catPackId, phoPackId} = req.body;
        if(!startDate || !endDate || !caterer || !decorator || !photographer || !decPackId || !catPackId || !phoPackId ){
            throw new ApiError(
                400,
                "Enter all details"
              );
        }
        
        const dec = await Package.findById(decPackId)
        const cat = await Package.findById(catPackId);
        const photo = await Package.findById(phoPackId);

        const totalCost = dec.price + cat.price + photo.price;
        totalCost = totalCost*1.1;

        const userDetails = await Registration.create({
            firstName,
            lastName,
            email,
            startDate,
            endDate,  
            venue,          
            caterer,
            decorator,
            photographer,
            cost:totalCost,
            hasHappened:false,  
        });

    return res
    .status(200)
    .json(new ApiResponse(200, userDetails, "Event Booking Sucessfull"));   
        
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong"
          );
    }
}



exports.addImageToEvent = async(req,res) => {
    try {
        const {regId} = req.body;
        const event = await Registration.findById(regId);
        if(!regId){
            throw new ApiError(
                404,
                "No such event found",
              );
        }
        const image = req.files.eventImage;
        if(!image){
            throw new ApiError(
                404,
                "Insert images to be added",
              );
        }
        event.image = image;

        return res
    .status(200)
    .json(new ApiResponse(200, {}, "Images added to event succesfully"));   

    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong"
          );
    }
}