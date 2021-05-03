const Projects = require("../models/Projects");

exports.createProject = async (req, res) => {
  try {
    const project = new Projects(req.body);
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("An Error Occurs");
  }
};
