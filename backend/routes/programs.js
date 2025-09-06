const express = require("express");
const router = express.Router();
const Program = require("../models/program");

/** GET /api/programs
 * Returns all programs
 * Can filter by sector using query parameter: /api/programs?sector=sectorId
 */
router.get("/", async (req, res) => {
  try {
    let query = {};

    // If sector ID is provided, filter by that sector
    if (req.query.sector) {
      query.sectors = req.query.sector;
    }

    const programs = await Program.find(query)
      .populate("sectors", "name")
      .sort("name");

    res.send(programs);
  } catch (error) {
    res.status(500).send("Error fetching programs: " + error.message);
  }
});

/** POST /api/programs
 * Creates a new program
 * Requires name, description, and at least one sector ID
 */
router.post("/", async (req, res) => {
  try {
    const program = new Program({
      name: req.body.name,
      developer: req.body.developer,
      description: req.body.description,
      sectors: req.body.sectors,
      tags: req.body.tags,
      websiteUrl: req.body.websiteUrl,
      imageUrl: req.body.imageUrl,
    });

    const savedProgram = await program.save();
    const populatedProgram = await savedProgram.populate("sectors", "name");
    res.status(201).send(populatedProgram);
  } catch (error) {
    res.status(400).send("Error creating program: " + error.message);
  }
});

/** GET /api/programs/:id
 * Returns a specific program
 */
router.get("/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate(
      "sectors",
      "tags",
      "name"
    );

    if (!program) return res.status(404).send("Program not found");
    res.send(program);
  } catch (error) {
    res.status(500).send("Error fetching program: " + error.message);
  }
});

/** PUT /api/programs/:id
 * Updates a program
 */
router.put("/:id", async (req, res) => {
  try {
    const updateData = {};

    // Only update fields that are provided
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.sectors) updateData.sectors = req.body.sectors;
    if (req.body.websiteUrl) updateData.websiteUrl = req.body.websiteUrl;
    if (req.body.imageUrl) updateData.imageUrl = req.body.imageUrl;
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.developer) updateData.developer = req.body.developer;

    const program = await Program.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("sectors", "name");

    if (!program) return res.status(404).send("Program not found");
    res.send(program);
  } catch (error) {
    res.status(400).send("Error updating program: " + error.message);
  }
});

/** DELETE /api/programs/:id
 * Deletes a program
 */
router.delete("/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).send("Program not found");
    res.send(program);
  } catch (error) {
    res.status(500).send("Error deleting program: " + error.message);
  }
});

module.exports = router;
