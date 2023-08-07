const request = require("request");
const Users = require("../models/user");
const User = require("../models/user");

const todaysJobs = () => {
	return new Promise((resolve, reject) => {
		request.get(
			{
				url: process.env.ADZUNA_URL,
			},
			function (error, response, body) {
				if (error) return console.error("Request failed:", error);
				else if (response.statusCode != 200)
					return console.error(
						"Error:",
						response.statusCode,
						body.toString("utf8")
					);
				else {
					resolve(JSON.parse(body));
				}
			}
		);
	});
};

module.exports.signUp = function (req, res) {
	res.render("sign_up.ejs");
};

module.exports.createSession = function (req, res) {
	req.flash("message", `Welcome ${req.user.email}!!`);
	res.redirect("/users/profile");
};

module.exports.createUser = async function (req, res) {
	console.log(req.body.email, req.body.password, req.body.empID);
	let userEmpID = await Users.findOne({ empID: req.body.empID });
	let userEmail = await Users.findOne({ email: req.body.email });

	if (userEmpID || userEmail) {
		req.flash("message", "User already exists");
		return res.redirect("/");
	}
	await Users.create({
		email: req.body.email,
		password: req.body.password,
		empID: req.body.empID,
	});
	req.flash("message", "Successfully registered, Please Sign In to continue");
	return res.redirect("/");
};

module.exports.signIn = function (req, res) {
	res.render("sign_in.ejs");
};

module.exports.signOut = function (req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.flash("message", "Successfully Logged Out");
		return res.redirect("/");
	});
};

module.exports.profile = async function (req, res) {
	let jobs = await todaysJobs();
	if (jobs) {
		return res.render("profile.ejs", { jobs: jobs.results });
	} else {
		return res.render("profile.ejs", {
			jobs: "Error fetching today's jobs! That's a fact",
		});
	}
};

module.exports.changePassword = function (req, res) {
	return res.render("changePass.ejs");
};

module.exports.updatePassword = async function (req, res) {
	try {
		let user = await User.findOne({
			empID: req.body.empID,
			email: req.body.email,
			password: req.body.old,
		});

		if (user) {
			let updatedUser = await User.findByIdAndUpdate(user.id, {
				password: req.body.new,
			});
			updatedUser.save();

			if (updatedUser) {
				req.flash("message", `Password Changed Successfully`);
				return res.redirect("/");
			}
		} else {
			req.flash("message", `Error in changing the password`);
			return res.redirect("/");
		}
	} catch (error) {
		// console.log("Error in changing the password", error);
		req.flash("message", `Error in changing the password`);
		return res.redirect("/");
	}
};
