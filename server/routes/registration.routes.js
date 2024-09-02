const express = require("express");
const router = express.Router();
const {
  register,
  addImageToEvent,
  payment,
} = require("../controllers/registration.controller.js");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
// const { verifyJWT } = require("../middlewares/auth.middleware.js");

router.post("/registerEvent", register);
router.post("/addImageToEvent", upload.single("eventImage"), addImageToEvent);
router.post("/payment", payment);
module.exports = router;
