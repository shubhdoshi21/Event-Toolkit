const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");

const { ApiError } = require("./utils/ApiError.js");

const userRouter = require("./routes/user.routes.js");

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
app.use("/api/v1/users", userRouter);

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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected...");
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  })
  .catch((err) => console.log(err));
