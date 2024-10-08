const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cron = require('node-cron');
const { ApiError } = require("./utils/ApiError.js");

const vendorRouter = require("./routes/vendor.route.js");
const packageRouter = require("./routes/package.route.js");

const userRouter = require("./routes/user.routes.js");
const cityRouter = require("./routes/cities.routes.js");
const reviewRouter = require("./routes/reviews.routes.js");
const registrationRouter = require("./routes/registration.routes.js");
const venueRouter = require("./routes/venues.routes.js")


// Initialize dotenv to load environment variables from a .env file
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/package", packageRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/registration", registrationRouter);
app.use("/api/v1/venues", venueRouter);


// Error catch configuration
app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ success: false, message: "Resource not found, check URL" });
});

// Global error handler

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  // Default to 500 Internal Server Error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const port = process.env.PORT || 3001;

cron.schedule('0 0 * * *', async () => {
  try {
      const currentDate = new Date();
      await Registration.updateMany(
          { endDate: { $lt: currentDate }, hasHappened: false },
          { $set: { hasHappened: true } }
      );
      console.log('Updated hasHappened for events that have ended.');
  } catch (error) {
      console.error('Error updating hasHappened:', error);
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected...");
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  })
  .catch((err) => console.log(err));
