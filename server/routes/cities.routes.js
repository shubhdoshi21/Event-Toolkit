const express = require("express");
const router = express.Router();
const {
  getAllCitiesExceptSelected,
  getCityById,
  getAllVenuesAtCity,
  postCity,
  postVenueAtCity,
  deleteCity,
  deleteVenueAtCity,
  updateCity,
} = require("../controllers/cities.controller.js");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/getAllCitiesExceptSelected", getAllCitiesExceptSelected);
router.get("/getCityById", getCityById);
router.get("/getAllVenuesAtCity", getAllVenuesAtCity);
router.post("/postCity", upload.single("image"), postCity);
router.post("/postVenueAtCity", postVenueAtCity);
router.delete("/deleteCity", deleteCity);
router.post("/deleteVenueAtCity", deleteVenueAtCity);
router.put("/updateCity", updateCity);

module.exports = router;
