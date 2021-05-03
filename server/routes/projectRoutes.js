const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");

//creates projects api/projects
router.post("/", createProject);
module.exports = router;
