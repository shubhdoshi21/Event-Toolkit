const Registration = require('../models/Registration');
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");

exports.register = async(req,res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(id);
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
        const userDetails = await User.create({
            firstName,
            lastName,
            email,
            startDate,
            endDate,            
            caterer,
            decorator,
            photographer,
            hasHappened:false,
        });
        
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
          );
    }
}