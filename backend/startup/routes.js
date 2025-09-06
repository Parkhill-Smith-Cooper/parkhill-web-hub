const express = require("express");
const sectors = require("../routes/sectors");
const tags = require("../routes/tags");
const programs = require("../routes/programs");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/sectors", sectors);
  app.use("/api/tags", tags);
  app.use("/api/programs", programs);
};
