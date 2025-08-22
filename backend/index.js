const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const winston = require("winston");
const app = express();

// Load configuration from environment variables or config file
let config = {};
try {
  // Try to load config.json for local development
  config = require("./config.json");
} catch (error) {
  // Use environment variables for production/deployment
  config = {
    MONGO_DB_API_KEY: process.env.MONGO_DB_API_KEY || process.env.MONGODB_URI
  };
}

// Enable CORS for all routes
app.use(cors({ origin: "*" }));

// Connect to MongoDB
const mongoConnectionString = config.MONGO_DB_API_KEY || "mongodb://localhost/parkhill-web-hub";

mongoose
  .connect(mongoConnectionString)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
