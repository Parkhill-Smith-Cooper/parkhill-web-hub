const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

const Sector = mongoose.model("Sector", sectorSchema);

module.exports = Sector;
