const Projects = require("../models/Projects");

exports.createProject = async (req, res) => {
  try {
    const project = new Projects(req.body);
    //get creator id via jwt
    project.creator = req.user.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("An Error Occurs");
  }
};
