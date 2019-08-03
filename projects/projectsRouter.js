const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

// send a GET request to retrieve all projects
router.get("/", async (req, res) => {
  try {
    const projects = await db.get(res.query);
    if (projects) {
      res.json(projects);
    } else {
      res.status(404).json({ message: "projects not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
