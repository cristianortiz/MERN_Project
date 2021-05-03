const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const errors = validationResult(req);
  //use the rules in authroutes.js
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //get email and password from request
  const { email, password } = req.body;

  try {
    //check if user is registered
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "the user is not registered" });
    }
    //if user exists check password
    const valid_password = await bcryptjs.compare(password, user.password);
    if (!valid_password) {
      return res.status(400).json({ msg: "wrong password!" });
    }
    //if user exists and his password is the right one, creation and signature of jwt
    const payload = {
      user: {
        id: user.id,
      },
    };
    //signature of token
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, //1 hour of token life
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
