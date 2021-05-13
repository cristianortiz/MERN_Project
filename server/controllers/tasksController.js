const Tasks = require("../models/Tasks");
const Projects = require("../models/Projects");
const { validationResult } = require("express-validator");

//create a nre task associed whit a project id
exports.createTask = async (req, res) => {
  //check for error from taskRoute
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //extracting project_id from new task  data
    const { project_id } = req.body;
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

//get tasks by project id
exports.getTasks = async (req, res) => {
  try {
    //extracting project_id from req  data
    const { project_id } = req.query;
    //check if the project associated whit the tasks already exists
    const project = await Projects.findById(project_id);
    if (!project) {
      return res.status(404).json({ msg: "project doesn't exists" });
    }
    //check if the creator of the project is currently logged
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "permission denied" });
    }

    //get task list of a project
    const tasks = await Tasks.find({ project_id }).sort({ _id: -1 });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurs");
  }
};
//update the state of a task
exports.updateTask = async (req, res) => {
  try {
    //extracting project_id from req  data
    const { task_name, state, project_id } = req.body;
    //check if the task exists id came from the req data '/:id'
    const task_exists = await Tasks.findById(req.params.id);
    if (!task_exists) {
      return res.status(404).json({ msg: "Task doesn't exists" });
    }
    //extracts project to check if their owner is logged
    const project = await Projects.findById(project_id);
    if (!project) {
      return res.status(404).json({ msg: "project doesn't exists" });
    }
    //check if the creator of the project is currently logged
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "permission denied" });
    }

    //after passing the previous validations creates the new task object
    const newTask = {};
    if (task_name) newTask.task_name = task_name;
    if (state) newTask.state = state;

    //save the task object
    const task = await Tasks.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurs");
  }
};

//delete a task by id
exports.deleteTask = async (req, res) => {
  try {
    //extracting project_id from req  data
    const { project_id } = req.query;
    //check if the task exists id came from the req data '/:id'
    const task_exists = await Tasks.findById(req.params.id);
    if (!task_exists) {
      return res.status(404).json({ msg: "Task doesn't exists" });
    }
    //extracts project to check if their owner is logged
    const project = await Projects.findById(project_id);
    if (!project) {
      return res.status(404).json({ msg: "project doesn't exists" });
    }
    //check if the creator of the project is currently logged
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "permission denied" });
    }

    //after the previous validations delete the task
    await Tasks.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Task removed" });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurs");
  }
};
