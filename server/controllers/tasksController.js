const Tasks = require("../models/Tasks");
const Project = require("../models/Projects");
const { validationResult } = require("express-validator");
const Projects = require("../models/Projects");

//create a nre task associed whit a project id
exports.createTask = async (req, res) => {
  //check for error from taskRoute
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extracting project_id from new task  data
  const { project_id } = req.body;
  try {
    //check if the project associated whit the new task already exists
    const project = await Projects.findById(project_id);
    if (!project) {
      return res.status(404).json({ msg: "project doesn't exists" });
    }

    //check if the creator of the project is currently logged
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "permission denied" });
    }

    //create the task in DB
    const task = new Tasks(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurs");
  }
};
