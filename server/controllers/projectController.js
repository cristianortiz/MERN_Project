const Projects = require("../models/Projects");
const { validationResult } = require("express-validator");

//creates a new project
exports.createProject = async (req, res) => {
  //chek for errors with expres validation check in projectRoutes
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = new Projects(req.body);
    //get creator id via jwt stored data in auth middleware
    project.creator = req.user.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("An Error occurs");
  }
};
//get all projects of a logged valid user
exports.getProjects = async (req, res) => {
  try {
    //we have the logged user data from auth middleware
    const user_projects = await Projects.find({ creator: req.user.id }).sort({
      created_at: -1,
    });
    res.json({ user_projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurs");
  }
};

//updates a project data
exports.updateProject = async (req, res) => {
  //chek for errors with expres validation check in projectRoutes
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //extract project data from request
  const { proj_name } = req.body;
  const newProject = {}; //posible updated fields to update
  //check if there is other projects fields updated
  if (proj_name) {
    newProject.proj_name = proj_name;
  }

  try {
    //check the project id
    let project = await Projects.findById(req.params.id);
    //check if the id projects exists
    if (!project) {
      return res.status(404).json({ msg: "project doesn't exists" });
    }
    //check project creator as the same logged
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "permission denied" });
    }
    //update the project after all the previous verifications
    project = await Projects.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurs");
  }
};

//delete specific project by id
exports.deleteProject = async (req, res) => {
  try {
    //check the project id
    let project = await Projects.findById(req.params.id);
    //check if the id projects exists
    if (!project) {
      return res.status(404).json({ msg: "project doesn't exists" });
    }
    //check project creator as the same logged
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "permission denied" });
    }
    //delete the project after all the previous verifications
    await Projects.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "project deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurs");
  }
};
