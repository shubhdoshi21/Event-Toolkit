const Registration = require('../models/Registration.js');
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const User = require('../models/user.model.js');

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
        const {startDate, endDate, caterer, decorator, photographer} = req.body;
        if(!startDate || !endDate || !caterer || !decorator || !photographer){
            throw new ApiError(
                400,
                "Enter all details"
              );
        }
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