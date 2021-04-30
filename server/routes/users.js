//routes to create users
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

//create a new user api/users
router.post("/", usersController.createUser);
module.exports = router;
