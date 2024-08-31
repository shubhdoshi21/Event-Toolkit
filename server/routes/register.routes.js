const {Router} = require('express');
const { register, addImageToEvent } = require('../controllers/Registration')
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const router = Router();

router.post("/registerEvent", register);
router.post("/addImageToEvent",addImageToEvent);