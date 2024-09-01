const express = require("express");
const router = express.Router();
const { register, addImageToEvent } = require('../controllers/Registration')
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
// const { verifyJWT } = require("../middlewares/auth.middleware.js");


router.post("/registerEvent", register);
router.post("/addImageToEvent",upload.single('eventImage'),addImageToEvent);

module.exports = router;