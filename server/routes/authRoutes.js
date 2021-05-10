//routes to authenticate users after login form
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
  authUser,
  authenticatedUser,
} = require("../controllers/authController");

//authenticate users api/auth
router.post("/", authUser);
//get authenticated user, the middleware/auth checks the
router.get("/", auth, authenticatedUser);
module.exports = router;
