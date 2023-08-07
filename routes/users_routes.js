const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller.js");

// Dispplay the Sign-up form
router.get("/sign-up", usersController.signUp);

//Logging in and creating session (stored in db)
router.post(
	"/create-session",
	passport.authenticate("local", {
		failureRedirect: "/",
	}),
	usersController.createSession
);

//Creating a user-password for the first time in db
router.post("/create-user", usersController.createUser);

//Logging out the user for the current session
router.post("/sign-out", usersController.signOut);

//Access to profile page and menu options
router.get("/profile", passport.checkAuthentication, usersController.profile);

//Display the change password Page
router.get("/change-password", usersController.changePassword);

//Update the password in db
router.post("/update-password", usersController.updatePassword);

module.exports = router;
