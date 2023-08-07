const express = require("express");
const router = express.Router();
const passport = require("passport");

const batchesController = require("../controllers/batches_controller");
const studentsController = require("../controllers/students_controller");
const interviewsController = require("../controllers/interviews_controller");
const resultsController = require("../controllers/results_controller");

//To reach any URL, this is the Auth route(If auth fails, redirected to home)
router.use(passport.checkAuthentication);

//Batches tasks
router.get("/batches", batchesController.allBatches); //shows all batches
router.post("/create-batch", batchesController.createBatch); //creates a batch
router.get("/batch/:batchID", batchesController.batchDetails); //shows details of a batch (Params: batchID)

//Students tasks
router.get("/students", studentsController.allStudents); //shows all students
router.post("/add-student", studentsController.addStudent); //adds a student
router.get("/student-details/:studentID", studentsController.studentDetails); //shows details of a student (Params: studentID)
router.post(
	"/update-student-details/:studentID",
	studentsController.updateStudentDetails
); //updates details of a student (Params: studentID)

//Interviews tasks
router.get("/interviews", interviewsController.allInterviews); //shows all interviews
router.post("/add-interview", interviewsController.addInterviews); //adds an interview
router.get(
	"/interview-details/:interviewID",
	interviewsController.interviewDetails
); //shows details of an interview (Params: interviewID)
router.post(
	"/interview/add-students/:interviewID",
	interviewsController.addStudentsToInterview
); //add students to an interview (Params: interviewID)
router.post(
	"/interview/mark-result/:interviewID",
	interviewsController.markResultsForInterview
); //mark results of students of an interview (Params: interviewID)

//Results tasks
router.get("/results", resultsController.allResults); //shows all results
router.get("/results/download", resultsController.downloadResults); //provides the CSV of the results shown

module.exports = router;
