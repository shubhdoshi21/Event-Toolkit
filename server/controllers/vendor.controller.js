const {Vendor} = require("../models/vendor.model.js")
const {Package} = require("../models/package.model.js")
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
// const {reviews} = require()

const getVendorDetails = asyncHandler(async(req,res)=>{
    try {
        const {vendorId} = req.body;
        console.log(vendorId)
        if(!vendorId){
            throw new ApiError(400, "Vendor id is required");
        }
        const vendorDetails = await Vendor.findById(vendorId).populate("packages").populate("ratingAndReview");
                            //   
                             
        return res.status(200).json(
            new ApiResponse(200,{data:vendorDetails},"Vendor Details fetched successfully")
        )

    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode || 500, null, error.message)
        );
    }
})

const addServiceDetails = asyncHandler(async(req,res)=>{
    try {
        const {serviceName,location,about} = req.body;
        if(!serviceName || !location || !about){
            throw new  ApiError(400, "Everything is required to add service details");
        }

        //gallery handling remains
         const vendorId = req.body;
        // const vendorDetails = await User.findById(vendorId);

        // if (!vendorDetails) {
        //  throw new ApiError(404, "Vendor not found");
        // }

        const createdService = await Vendor.create({
            serviceName,
            location,
            about,
        })

        return res.status(200).json(
            new ApiResponse(200,{data:createdService},"Service created succesfully")
        )

    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode || 500, null, error.message)
        );
    }
})


const updateServiceDetails = asyncHandler(async(req,res)=>{
    try {
        const {serviceName,location,about,vendorId} = req.body;
    //  const vendorId = req.body.vendorId;
    //  const vendorId = req.params.vendorId;
      console.log(serviceName,location,about,vendorId);
    if(!serviceName || !location || !about){
        throw new  ApiError(400, "Everything is required to add service details");
    }
    const vendor = await Vendor.findById(vendorId);
    // console.log(vendor);
    if(!vendor){
        throw new ApiError(404, "Vendor not found inside update service");
    }
    const newService = await Vendor.findByIdAndUpdate(vendorId, 
        { serviceName, location, about }, 
        { new: true });
    await newService.save();

    return res.status(200).json(
        new ApiResponse(200,{data:newService},"Service created succesfully")
    )  
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode || 500, null, error.message)
        );
    }
    

})




const deleteServiceDetails = asyncHandler(async(req,res)=>{
    try {
        console.log("hello")
        const {vendorId} = req.body;
        console.log(vendorId)
        const service = await Vendor.findByIdAndDelete(vendorId);
        if (!service) {
            throw new ApiError(404, "Service not found");
        }
        return res.status(200).json(
            new ApiResponse(200, null, "Service deleted successfully")
        );
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode || 500, null, "Internal server error in deleting service")
        );
    }
})

module.exports ={getVendorDetails,addServiceDetails,updateServiceDetails,deleteServiceDetails}