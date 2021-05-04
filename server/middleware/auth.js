const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //read token from header
  const token = req.header("x-auth-token");
  //console.log(token);
  //if there is not a token, there is not a valid user logged
  if (!token) {
    return res.status(401).json({ msg: "No token, permission denied" });
  }
  //validates token
  try {
    const encode_data = jwt.verify(token, process.env.SECRET);
    //User data to use in projectController to asign a new project to a valid user id
    req.user = encode_data.user; //new object in jwt
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
