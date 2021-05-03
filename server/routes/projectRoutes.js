const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//creates projects api/projects
router.post("/", auth, createProject);
module.exports = router;
