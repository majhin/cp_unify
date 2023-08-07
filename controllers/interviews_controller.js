const Students = require("../models/student");
const Interviews = require("../models/interview");
const Results = require("../models/result");
const moment = require("moment");

module.exports.allInterviews = async function (req, res) {
	try {
		let interviews = await Interviews.find({});

		if (interviews) {
			return res.render("interviews/interviews.ejs", {
				interviews,
			});
		}
		return res.redirect("/users/profile");
	} catch (error) {
		console.log(error);
	}
};

module.exports.addInterviews = async function (req, res) {
	let date = moment.utc(req.body.date, moment.ISO_8601);
	let today = moment().utc().startOf("day");
	if (date.isBefore(today)) {
		req.flash("message", "Interview cannot be posted before today");
		return res.redirect("/tasks/interviews");
	}
	try {
		let newInterview = await Interviews.create({
			companyName: req.body.companyName,
			date: req.body.date,
		});
		if (newInterview) {
			req.flash("message", "Interview created successfully");
			return res.redirect(`/tasks/interview-details/${newInterview.id}`);
		}
	} catch (error) {
		console.log(error);
		req.flash("message", "Error creating Interview, Please Contact IT");
		return res.redirect("/tasks/interviews");
	}
};

module.exports.interviewDetails = async function (req, res) {
	try {
		let interview = await Interviews.findById(req.params.interviewID);
		let students = await Students.find({});
		let results = await Results.find({ interview: interview.id });
		let resultsStudentIDArray = results.map((result) =>
			result.student.toString()
		);

		if (interview && students) {
			res.render("interviews/interviewDetails.ejs", {
				interview,
				students,
				results,
				resultsStudentIDArray,
			});
		}
	} catch (error) {
		console.log(error);
		req.flash("message", "Interview Not Found, Please Contact IT");
		return res.redirect("/tasks/interviews");
	}
};

module.exports.addStudentsToInterview = async function (req, res) {
	if (req.body) {
		async function assignStudentsToInterview(interviewId, studentIds) {
			if (studentIds[0] == undefined) {
				return res.redirect("back");
			}
			try {
				// Update the interview's students array with multiple student IDs
				await Interviews.findByIdAndUpdate(interviewId, {
					$addToSet: { students: { $each: studentIds } },
				});

				// Update the students' interview array with the interview ID
				await Students.updateMany(
					{ _id: { $in: studentIds } },
					{ $addToSet: { interview: interviewId } }
				);
				req.flash("message", "Students added successfully");
				return res.redirect(`/tasks/interview-details/${interviewId}`);
			} catch (err) {
				// console.error("Error assigning students to interview:", err);
				req.flash(
					"message",
					"Error assigning students to interview. Please Contact IT"
				);
				return res.redirect(
					`/tasks/interview-details/${req.params.interviewID}`
				);
			}
		}

		// Call the function to assign multiple students to an interview
		const interviewId = req.params.interviewID;
		let studentIds = req.body.studentID;
		if (typeof studentIds != "object") {
			studentIds = [req.body.studentID];
		}
		assignStudentsToInterview(interviewId, studentIds);
	}
};

module.exports.markResultsForInterview = async function (req, res) {
	let results = [];
	if (typeof req.body.result == "object") {
		for (let i = 0; i < req.body.result.length; i++) {
			let resultObj = {
				id: req.body.result[i].split("#")[0],
				result: req.body.result[i].split("#")[1],
			};
			results.push(resultObj);
		}
	} else {
		let resultObj = {
			id: req.body.result.split("#")[0],
			result: req.body.result.split("#")[1],
		};
		results.push(resultObj);
	}
	let interview = await Interviews.findById(req.params.interviewID);
	results.forEach(async (oneStudent) => {
		try {
			let result = await Results.findOne({
				student: oneStudent.id,
				interview: interview.id,
			});
			if (result) {
				let update = await Results.findByIdAndUpdate(result.id, {
					result: oneStudent.result,
				});
				update.save();
			} else {
				let newResult = await Results.create({
					result: oneStudent.result,
					student: oneStudent.id,
					interview: interview.id,
				});
				newResult.save();
			}
		} catch (error) {
			console.log(error);
		}
	});
	req.flash("message", "Results marked Successfully");
	return res.redirect(`/tasks/interview-details/${req.params.interviewID}`);
};
