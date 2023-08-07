const express = require("express");
const router = express.Router();
const passport = require("passport");

const homeController = require("../controllers/home_controller");

router.get("/", passport.disableSignIn, homeController.home);

router.use("/users", require("./users_routes"));
router.use("/tasks", require("./tasks_routes"));

module.exports = router;
