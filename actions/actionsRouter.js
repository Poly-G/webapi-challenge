const express = require("express");
const db = require("../data/helpers/actionModel");
const dbProjects = require("../data/helpers/projectModel");
const router = express.Router();

// send a GET (READ) request to retrieve all actions
router.get("/", async (req, res) => {
  try {
    const actions = await db.get(res.query);
    if (actions) {
      res.json(actions);
    } else {
      res.status(400).json({ message: "actions not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
