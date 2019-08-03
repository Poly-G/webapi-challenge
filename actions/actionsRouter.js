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

// send a GET (READ) request to retrieve a single action
router.get("/:id", validateID, async (req, res) => {
  try {
    const action = await db.get(req.params.id);
    res.json(action);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
async function validateID(req, res, next) {
  try {
    const action = await db.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ message: "invalid action ID" });
    }
  } catch (err) {
    res.status(404).json({ message: "No action found at that id" });
  }
}

module.exports = router;
