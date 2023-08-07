const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/user");

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		async function (username, password, done) {
			let user;

			try {
				user = await Users.findOne({ email: username });
				if (!user || user.password != password) {
					console.log("Invalid Username/Password");
					return done(null, false);
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

//serailizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
	let user;

	try {
		user = await Users.findById(id);

		if (user) {
			return done(null, user);
		}
	} catch (error) {
		console.log(error);
	}
});

passport.checkAuthentication = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect("/");
};

passport.disableSignIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}

	next();
};

passport.setAuthenticatedUser = function (req, res, next) {
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
	}
	next();
};

module.exports = passport;
