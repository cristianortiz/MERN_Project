//routes to authenticate users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authUser } = require("../controllers/authController");

//authenticate users api/auth
router.post(
  "/",
  [
    check("email", "enter a valid email").isEmail(),
    check("password", "minimum of 6 characters").isLength({ min: 6 }),
  ],
  authUser
);
module.exports = router;
