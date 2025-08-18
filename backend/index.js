const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const winston = require("winston");
const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/parkhill-web-hub")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
