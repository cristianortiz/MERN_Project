const jwt = require("jsonwebtoken");

//this middleware checks for token and validates it to authenticate a registered user
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
    req.user = encode_data.user; //new object in jwt for a valid user token
    //pass to the next function in routes
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
