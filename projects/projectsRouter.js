const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

//C-REATE
//R-EAD
//U-PDATE
//D-ELETE

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

//controller
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
