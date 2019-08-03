const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

//C-REATE
//R-EAD
//U-PDATE
//D-ELETE

// get - post - put - delete

// send a GET (READ) request to retrieve all projects
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

// send a GET (READ) request to retrieve a single project
router.get("/:id", validateID, async (req, res) => {
  const project = await db.get(req.params.id);
  res.json(project);
});

// send a POST (CREATE) request to create a project
router.post("/", async (req, res) => {
  try {
    const project = await db.insert(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// send a PUT (UPDATE) request to edit a project
router.put("/:id", validateID, async (req, res) => {
  try {
    const project = await db.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error updating the project"
    });
  }
});

// send a DELETE request to delete a project
router.delete("/:id", validateID, async (req, res) => {
  try {
    const project = await db.remove(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// send a GET (READ) request to retrieve all actions for a project
router.get("/:id/actions", validateID, async (req, res) => {
  try {
    const projectActions = await db.getProjectActions(req.params.id);
    res.json(projectActions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function validateID(req, res, next) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Missing ID" });
  } else {
    const idValidated = await db.get(id);
    if (!idValidated) {
      res.status(404).json({ message: "ID not found" });
      return;
    }
  }
  next();
}

module.exports = router;
