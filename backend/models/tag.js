const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
