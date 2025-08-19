const mongoose = require("mongoose");
const Program = require("../models/program");

const mongoURI = "mongodb://localhost/parkhill-web-hub";

async function addWebsiteUrlsToPrograms() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB...");

    // Update all programs that don't have a websiteUrl
    const result = await Program.updateMany(
      { websiteUrl: { $exists: false } }, // find documents where websiteUrl doesn't exist
      {
        $set: {
          websiteUrl: "", // Set empty string as default
        },
      }
    );

    console.log(
      `Updated ${result.modifiedCount} programs with default empty website URL`
    );

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

// Run the migration
addWebsiteUrlsToPrograms();
