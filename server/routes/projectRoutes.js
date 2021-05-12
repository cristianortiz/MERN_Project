const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//creates projects api/projects
router.post(
  "/",
  auth, //validates logged user
  [check("proj_name", "project name is mandatory").notEmpty()],
  createProject
);
//get projects from logged user api/projects
router.get("/", auth, getProjects);

//updates a specific project by id
router.put(
  "/:id",
  auth, //validates logged user
  [check("proj_name", "project name is mandatory").notEmpty()],
  updateProject
);

//delete specific project by id
router.delete(
  "/:id",
  auth, //validates logged user

  deleteProject
);

module.exports = router;
