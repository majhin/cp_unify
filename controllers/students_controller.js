const Students = require("../models/student");
const Batches = require("../models/batch");
const Results = require("../models/result");

//Provides all the students registered
module.exports.allStudents = async function (req, res) {
	try {
		let allBatches = await Batches.find({});
		let allStudents = await Students.find({}).populate("batch");
		if (allBatches && allStudents) {
			return res.render("students/students.ejs", {
				allBatches,
				allStudents,
			});
		}
		return res.redirect("/users/profile");
	} catch (error) {
		console.log(error);
	}
};

//Add a new student, email cannot be duplicate(message is shown if that's the case)
module.exports.addStudent = async function (req, res) {
	try {
		let student = await Students.findOne({ email: req.body.email });
		if (student) {
			req.flash(
				"message",
				"Student already exists, Kindly check the current profile"
			);
			return res.redirect("/tasks/students");
		}
		let { name, email, college, status, batch } = req.body;
		let newStudent = await Students.create({
			name,
			email,
			college,
			status,
			batch,
		});
		if (newStudent) {
			let batch = await Batches.findById(newStudent.batch._id);
			batch.students.push(newStudent.id);
			batch.save();
			req.flash("message", "Student added successfully");
			return res.redirect("/tasks/students");
		}
	} catch (error) {
		console.log(error);
		req.flash("message", "Error adding student. Please Contact IT");
		return res.redirect("/tasks/students");
	}
};

//Provides student details, result, marks, interviews associated
module.exports.studentDetails = async function (req, res) {
	try {
		let student = await Students.findById(req.params.studentID)
			.populate("batch")
			.populate("interview");
		let results = await Results.find({ student: student._id }).populate(
			"interview"
		);
		let resultsInterviewIDArray = results.map((result) =>
			result.interview.toString()
		);
		if (student) {
			return res.render("students/studentDetails.ejs", {
				student,
				results,
				resultsInterviewIDArray,
			});
		}
	} catch (error) {
		console.log(error);
		req.flash(
			"message",
			"Error loading details for student. Please Contact IT"
		);
		return res.redirect("/tasks/students");
	}
};

//Updates the student details and marks
module.exports.updateStudentDetails = async function (req, res) {
	try {
		let student = await Students.findById(req.params.studentID);

		if (student) {
			let updatedStudent = await Students.findByIdAndUpdate(student.id, {
				courseScores: {
					DSA: req.body.DSA,
					WebD: req.body.WebD,
					React: req.body.React,
				},
				status: req.body.status,
			});
			updatedStudent.save();
			if (updatedStudent) {
				req.flash("message", "Student details updated sucessfully");
				return res.redirect(`/tasks/student-details/${student.id}`);
			}
		}
	} catch (error) {
		console.log(error);
		req.flash(
			"message",
			"Student details could not be updated. Please Contact IT"
		);
		return res.redirect("/tasks/students");
	}
};
