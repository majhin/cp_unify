const Students = require("../models/student");
const Interviews = require("../models/interview");
const Results = require("../models/result");

const createCsvWriter = require("csv-writer").createObjectCsvWriter; //Library to generate CSV
const path = require("path");
const fs = require("fs");

//Creates the table of results present
function createTableData(results) {
	return new Promise((resolve, reject) => {
		let tableArray = [];

		results.forEach((result) => {
			let obj = {
				email: result.student.email,
				name: result.student.name,
				college: result.student.college,
				status: result.student.status ? "Placed" : "Not Placed",
				DSA: result.student.courseScores.DSA,
				WebD: result.student.courseScores.WebD,
				React: result.student.courseScores.React,
				date: `${result.interview.date}`.split(" 05:30:00")[0],
				company: result.interview.companyName,
				result: result.result,
			};
			tableArray.push(obj);
		});

		if (tableArray.length != 0) {
			resolve(tableArray);
		} else {
			reject("Error");
		}
	});
}

//Provides all results
module.exports.allResults = async function (req, res) {
	try {
		let results = await Results.find({})
			.populate("student")
			.populate("interview");

		if (results) {
			res.render("results/results.ejs", {
				results,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

//Allows to download results in CSV and store it on the server, when downloaded, deletes the file
module.exports.downloadResults = async function (req, res) {
	const filePath = path.join(__dirname, "CSVs");
	let fileName = Date.now();

	let results = await Results.find({})
		.populate("student")
		.populate("interview");

	let tableData = await createTableData(results);
	const csvWriter = createCsvWriter({
		path: `${filePath}/${fileName}.csv`,
		header: [
			{ id: "email", title: "Student Email" },
			{ id: "name", title: "Student Name" },
			{ id: "college", title: "Student College" },
			{ id: "status", title: "Student Status" },
			{ id: "DSA", title: "DSA Final Score" },
			{ id: "WebD", title: "WebD Final Score" },
			{ id: "React", title: "React Final Score" },
			{ id: "date", title: "Interview Date" },
			{ id: "company", title: "Interview Company" },
			{ id: "result", title: "Result" },
		],
	});

	csvWriter
		.writeRecords(tableData)
		.then(() => {
			req.flash("message", "Download Initiated");
			res.setHeader("Content-Disposition", "attachment; filename=table.csv");
			res.setHeader("Content-Type", "text/csv");
			res.sendFile(`${filePath}/${fileName}.csv`, (err) => {
				if (err) {
					console.error("Error while sending CSV:", err);
					res.status(500).send("An error occurred during CSV download.");
				} else {
					// Delete the file from the server's disk after it has been sent
					fs.unlink(`${filePath}/${fileName}.csv`, (deleteErr) => {
						if (deleteErr) {
							console.error("Error while deleting CSV file:", deleteErr);
						} else {
							console.log("CSV file deleted from the server.");
						}
					});
				}
			});
		})
		.catch((err) => {
			console.error("Error while generating CSV:", err);
			res.status(500).send("An error occurred during CSV generation.");
		});
};
