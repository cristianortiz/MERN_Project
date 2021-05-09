//routes to create users
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { check } = require("express-validator");

//create a new user api/users
router.post(
  "/",
  [
    //to validate data before request going to useController
    check("user_name", "name is mandatory").not().isEmpty(),
    check("email", "enter a valid email").isEmail(),
    check("password", "minimum of 6 characters").isLength({ min: 6 }),
  ],
  usersController.createUser
);
module.exports = router;
