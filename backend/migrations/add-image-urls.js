const mongoose = require("mongoose");
const Program = require("../models/program");

// MongoDB connection URL - replace with your actual connection string
const mongoURI = "mongodb://localhost/parkhill-web-hub";

async function addImageUrlsToPrograms() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB...");

    // Update all programs that don't have an imageUrl
    const result = await Program.updateMany(
      { imageUrl: { $exists: false } }, // find documents where imageUrl doesn't exist
      {
        $set: {
          imageUrl: "https://placehold.co/600x400?text=Program+Image",
        },
      }
    );

    console.log(
      `Updated ${result.modifiedCount} programs with default image URL`
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
addImageUrlsToPrograms();
