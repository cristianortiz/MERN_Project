const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //check for errors whit express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extracting email and password from request
  const { email, password } = req.body;
  try {
    //check unique email through moongoose functions
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "The user already exists" });
    }
    //create the new user using db defined scheme
    user = new User(req.body);

    //hashing the password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    //save the user in db
    await user.save();

    //creation and signature of jwt
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
    res.status(400).send("Error! ");
  }
};
