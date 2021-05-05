const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create a task api/tasks
router.post(
  "/",
  auth,
  [check("task_name", "task name is mandatory").notEmpty()],
  [check("project_id", "a task must be associated whit a project").notEmpty()],
  createTask
);
module.exports = router;
