const Registration = require("../models/registration.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { User } = require("../models/user.model.js");
const { Vendor } = require("../models/vendor.model.js");
const { Package } = require("../models/package.model.js");
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../config/firebase.config.js");
const { Venues } = require("../models/venues.model.js");
require("dotenv").config();
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.register = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(401, "Kindly login to register");
    }
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const {
      startDate,
      endDate,
      vendors,
      venue,
    } = req.body;
    if (
      !startDate ||
      !endDate ||
      !vendors ||
      !venue
    ) {
      throw new ApiError(400, "Enter all details");
    }

    let sum=0;
    vendors.map(async(obj)=>{
      let pkg = obj.packageId;
      let pack = await Package.findById(pkg);
      sum += pack.price;
    });

    let ven = await Venues.findById(venue);
    sum += ven.venuePrice;


    const userDetails = await Registration.create({
      firstName,
      lastName,
      email,
      startDate,
      endDate,
      vendors,
      venue,
      cost: sum,
      hasHappened: false,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, userDetails, "Event Booking Sucessfull"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
};

exports.addImageToEvent = async (req, res) => {
  try {
    const { regId } = req.body;
    const file = req.file;

    if (!regId) {
      throw new ApiError(404, "No such event found");
    }

    if (!file) {
      throw new ApiError(400, "Insert images to be added");
    }

    const event = await Registration.findById(regId);

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    // Upload the image to storage
    const fileName = `${Date.now()}_${file.originalname}`;
    const storageRef = ref(storage, `images/${fileName}`);
    const metadata = { contentType: file.mimetype };
    const uploadTask = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(uploadTask.ref);

    // Add the image URL to the event
    event.eventImages.push(downloadURL);

    // Save the event with the updated images
    await event.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: event },
          "Images added to event successfully"
        )
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

exports.payment = async (req, res) => {
  try {
    const { products } = req.body;
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity, 
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/payment/failed",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
};
