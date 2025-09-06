const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  developer: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  websiteUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return v === "" || /^https?:\/\//.test(v); // Must be empty or start with http:// or https://
      },
      message: "Website URL must start with http:// or https://",
    },
  },
  // Array of references to Sector documents
  sectors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sector", // This refers to the Sector model
      required: true,
    },
  ],
  // Array of references to Sector documents
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag", // This refers to the Tag model
      required: false,
    },
  ],
  imageUrl: {
    type: String,
    default: "https://placehold.co/600x400?text=Program+Image", // Default placeholder image
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Archived"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
