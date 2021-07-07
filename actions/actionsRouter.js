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

// send a POST (CREATE) request to create an action
router.post("/", async (req, res) => {
  try {
    const validateProject = await dbProjects.get(req.body.project_id);

    if (validateProject) {
      const newAction = await db.insert(req.body);
      res.json(newAction);
    } else {
      res.status(404).json({ message: "There is no project with that id" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// send a PUT (UPDATE) request to edit an action
router.put("/:id", validateID, async (req, res) => {
  try {
    const action = await db.update(req.params.id, req.body);
    res.json(action);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// send a DELETE request to delete an action
router.delete("/:id", validateID, async (req, res) => {
  try {
    const action = await db.remove(req.params.id);
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
