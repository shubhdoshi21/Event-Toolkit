const { Router } = require("express");
const router = Router();
const {getVendorDetails,addServiceDetails,updateServiceDetails,deleteServiceDetails} = require("../controllers/vendor.controller")

router.post("/getVendorDetails",getVendorDetails)
router.post("/addServiceDetails",addServiceDetails)
router.put("/updateServiceDetails",updateServiceDetails)
router.delete("/deleteServiceDetails",deleteServiceDetails)
module.exports = router;