const express = require("express");
const router = express.Router();
const passport = require("passport");

const batchesController = require("../controllers/batches_controller");
const studentsController = require("../controllers/students_controller");
const interviewsController = require("../controllers/interviews_controller");
const resultsController = require("../controllers/results_controller");

router.use(passport.checkAuthentication);

//Batches tasks
router.get("/batches", batchesController.allBatches);
router.post("/create-batch", batchesController.createBatch);
router.get("/batch/:batchID", batchesController.batchDetails);

//Students tasks
router.get("/students", studentsController.allStudents);
router.post("/add-student", studentsController.addStudent);
router.get("/student-details/:studentID", studentsController.studentDetails);
router.post(
	"/update-student-details/:studentID",
	studentsController.updateStudentDetails
);

//Interviews tasks
router.get("/interviews", interviewsController.allInterviews);
router.post("/add-interview", interviewsController.addInterviews);
router.get(
	"/interview-details/:interviewID",
	interviewsController.interviewDetails
);
router.post(
	"/interview/add-students/:interviewID",
	interviewsController.addStudentsToInterview
);
router.post(
	"/interview/mark-result/:interviewID",
	interviewsController.markResultsForInterview
);

//Results tasks
router.get("/results", resultsController.allResults);
router.get("/results/download", resultsController.downloadResults);

module.exports = router;
