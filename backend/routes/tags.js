const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Tag = require("../models/tag");

// Import middleware
const validateObjectId = require("../middleware/validateObjectId");

/** GET /api/tags
 * Returns all sector sorted by name
 * No authentication required
 */
router.get("/", async (req, res) => {
  const tags = await Tag.find().sort("name");
  res.send(tags);
});

/** POST /api/tags
 * Creates a new tag
 */
router.post("/", async (req, res) => {
  // First check if a tag with the same name already exists
  const existingTag = await Tag.findOne({ name: req.body.name });
  if (existingTag) return res.status(400).send("The tag already exists");

  let tag = new Tag({ name: req.body.name });
  tag = await tag.save();
  res.send(tag);
});

/** PUT /api/sectors/:id
 * Updates a tag's name
 * Requires id in URL and new name in body
 */
router.put("/:id", validateObjectId, async (req, res) => {
  const tag = await Tag.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  // If no tag was found with the given ID
  if (!tag) return res.status(404).send("Tag not found.");

  res.send(tag);
});

/** DELETE /api/tags/:id
 * Deletes a tag
 * Requires id in URL
 */
router.delete("/:id", validateObjectId, async (req, res) => {
  const tag = await Tag.findByIdAndDelete(req.params.id);

  // If no tag was found with the given ID
  if (!tag) return res.status(404).send("Tag not found.");

  res.send(tag);
});

/** GET /api/tags/:id
 * Returns a single tag by ID
 * Returns:
 * - 404: If ID format is invalid (handled by validateObjectId middleware) or genre not found
 * - 200: Tag object if found
 *
 * Example Response (200):
 * {
 *   "_id": "507f1f77bcf86cd799439011",
 *   "name": "MEP/S"
 * }
 */
router.get("/:id", validateObjectId, async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag)
    return res.status(404).send("The tag with the given ID was not found.");

  res.send(tag);
});

module.exports = router;
