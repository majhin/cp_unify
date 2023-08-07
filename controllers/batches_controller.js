const Batches = require("../models/batch");

//Creates a batch, duplicate names not allowed
module.exports.createBatch = async function (req, res) {
	if (req.body.name) {
		try {
			let batch = await Batches.findOne({ name: req.body.name });
			if (batch) {
				req.flash("message", "Batch already exists, Kindly use another name");
				return res.redirect("/tasks/batches");
			}
			await Batches.create({ name: req.body.name });
			req.flash("message", "Batch Created Successfully");
			return res.redirect("/tasks/batches");
		} catch (error) {
			console.log(error);
		}
	}
};

//Provides all the batches registered
module.exports.allBatches = async function (req, res) {
	try {
		let allBatches = await Batches.find({});
		return res.render("batches/batch.ejs", {
			allBatches,
		});
	} catch (error) {
		console.log(error);
	}
};

//Provides the detail of the batche selected
module.exports.batchDetails = async function (req, res) {
	try {
		let batch = await Batches.findById(req.params.batchID).populate("students");

		if (batch) {
			return res.render("batches/batchDetails.ejs", {
				batch,
			});
		}
	} catch (error) {
		console.log(error);
		return res.redirect("/tasks/batches");
	}
};
