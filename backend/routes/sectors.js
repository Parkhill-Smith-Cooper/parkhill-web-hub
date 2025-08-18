const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Sector = require("../models/sector");

// Import middleware
const validateObjectId = require("../middleware/validateObjectId");

/** GET /api/sectors
 * Returns all sector sorted by name
 * No authentication required
 */
router.get("/", async (req, res) => {
  const sectors = await Sector.find().sort("name");
  res.send(sectors);
});

/** POST /api/sectors
 * Creates a new sector
 */
router.post("/", async (req, res) => {
  // First check if a sector with the same name already exists
  const existingSector = await Sector.findOne({ name: req.body.name });
  if (existingSector) return res.status(400).send("The sector already exists");

  let sector = new Sector({ name: req.body.name });
  sector = await sector.save();
  res.send(sector);
});

/** PUT /api/sectors/:id
 * Updates a sector's name
 * Requires id in URL and new name in body
 */
router.put("/:id", validateObjectId, async (req, res) => {
  const sector = await Sector.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  // If no sector was found with the given ID
  if (!sector) return res.status(404).send("Sector not found.");

  res.send(sector);
});

/** DELETE /api/sectors/:id
 * Deletes a sector
 * Requires id in URL
 */
router.delete("/:id", validateObjectId, async (req, res) => {
  const sector = await Sector.findByIdAndDelete(req.params.id);

  // If no sector was found with the given ID
  if (!sector) return res.status(404).send("Sector not found.");

  res.send(sector);
});

/** GET /api/sectors/:id
 * Returns a single sector by ID
 * Returns:
 * - 404: If ID format is invalid (handled by validateObjectId middleware) or genre not found
 * - 200: Sector object if found
 *
 * Example Response (200):
 * {
 *   "_id": "507f1f77bcf86cd799439011",
 *   "name": "MEP/S"
 * }
 */
router.get("/:id", validateObjectId, async (req, res) => {
  const sector = await Sector.findById(req.params.id);

  if (!sector)
    return res.status(404).send("The sector with the given ID was not found.");

  res.send(sector);
});

module.exports = router;
