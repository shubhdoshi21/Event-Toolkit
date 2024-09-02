const { Router } = require("express");
const router = Router();
const {getVendorDetails,addServiceDetails,updateServiceDetails,deleteServiceDetails,getAllCaterer,getAllPhotographer,getAllDecorator} = require("../controllers/vendor.controller")

router.post("/getVendorDetails",getVendorDetails)
router.post("/addServiceDetails",addServiceDetails)
router.put("/updateServiceDetails",updateServiceDetails)
router.delete("/deleteServiceDetails",deleteServiceDetails)
router.get("/getAllCaterer",getAllCaterer)
router.get("/getAllPhotographer",getAllPhotographer)
router.get("/getAllDecorator",getAllDecorator)

module.exports = router;