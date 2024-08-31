const { Vendor } = require("../models/vendor.model.js");
const { Package } = require("../models/package.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");

const createPackages = asyncHandler(async (req, res) => {
  try {
    const { packageName, price, items  } = req.body;
    const vendorId = req.user.id;
    console.log(vendorId,packageName,price,items)
    if (!packageName || !price || !items) {
      throw new ApiError(400, "All fields are required in a package");
    }
  
    const newpackage = await Package.create({
      packageName: packageName,
      price: price,
      items: items,
    });
    console.log("New Package ID:", newpackage._id);

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new ApiError(404, "Vendor not found");
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      vendorId,
      {
        $push: {
          packages: newpackage._id,
        },
      },
      { new: true }
    ).populate("packages").exec();
      
      console.log(updatedVendor)
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: updatedVendor },
          "Package added successfully"
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          "Internal server error in creating package details"
        )
      );
  }
});

const deletePackages = asyncHandler(async (req, res) => {
  try {
     const { packageId, vendorId } = req.body;
   
  
    await Vendor.findByIdAndUpdate(vendorId, {
      $pull: { packages: packageId },
    });
   
    const package = await Package.findByIdAndDelete(packageId);
    const updatedNewVendor = await Vendor.findByIdAndUpdate(vendorId).populate(
      "packages"
    );
   
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: updatedNewVendor },
          "Package deleted successfully"
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          "Internal server error in deleting package"
        )
      );
  }
});


const updatePackages = asyncHandler(async (req, res) => {
    try {
        const { vendorId,packageId } = req.body;
      const {packageName, price, items } = req.body;
      if (!packageId || !packageName || !price || !items) {
        throw new ApiError(400, "All fields are required to update a package");
      }
      const updatedPackage = await Package.findByIdAndUpdate(
        packageId,
        {
          packageName: packageName,
          price: price,
          items: items,
        },
        { new: true } 
      );
  
      if (!updatedPackage) {
        throw new ApiError(404, "Package not found");
      }
  
      const vendorWithUpdatedPackage = await Vendor.findOne({
        packages: packageId,
      }).populate("packages");
  
      return res.status(200).json(
        new ApiResponse(200, { data: vendorWithUpdatedPackage }, "Package updated successfully")
      );
    } catch (error) {
      return res.status(error.statusCode || 500).json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          "Internal server error in updating package details"
        )
      );
    }
  });


  module.exports = {createPackages,updatePackages,deletePackages}