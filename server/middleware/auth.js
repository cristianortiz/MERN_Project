const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //read token from header
  const token = req.header("x-auth-token");
  //console.log(token);
  //if there is not a token
  if (!token) {
    return res.status(401).json({ msg: "No token,you have no permission" });
  }
  //validates token
  try {
    const crypto = jwt.verify(token, process.env.SECRET);
    //User data to use in projectController to asign a new project to a valid user id
    req.user = crypto.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
