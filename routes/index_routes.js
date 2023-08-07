const express = require("express");
const router = express.Router();
const passport = require("passport");

const homeController = require("../controllers/home_controller");

//Home route, can't be reached after sign in
router.get("/", passport.disableSignIn, homeController.home);

//Defines to use users router
router.use("/users", require("./users_routes"));

//Defines to use tasks router
router.use("/tasks", require("./tasks_routes"));

module.exports = router;
