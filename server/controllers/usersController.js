const User = require("../models/Users");

exports.createUser = async (req, res) => {
  try {
    let user;

    //create the new user usgin db defined scheme
    user = new User(req.body);
    //save the user in db
    await user.save();
    res.send("New user created succesfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error!");
  }
};
