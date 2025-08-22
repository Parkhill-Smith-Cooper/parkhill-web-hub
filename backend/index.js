const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const winston = require("winston");
const app = express();

const config = require("./config.json");

// Enable CORS for all routes
app.use(cors({ origin: "*" }));

// Connect to MongoDB
mongoose

  //   .connect("mongodb://localhost/parkhill-web-hub")
  //   .then(() => console.log("Connected to MongoDB..."))
  //   .catch((err) => console.error("Could not connect to MongoDB...", err));
  .connect(config.MONGO_DB_API_KEY)
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch((err) => console.error("Could not connect to MongoDB Atlas...", err));

require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
