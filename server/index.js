require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());


app.get("/", (req, res) => res.send("Hello World!"));

//Error catch configuration
app.all("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "Resource not found" });
});

app.use(async (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Handle specific error types
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (err.name === "NotFoundError") {
    return res.status(404).json({ message: "Resource not found" });
  }

  // Generic error handling
  return res.status(500).json({ message: "Internal server error" });
});

const port = 3001 || process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected...");
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  })
  .catch((err) => console.log(err));
