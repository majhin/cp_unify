const Batches = require("../models/batch");

module.exports.createBatch = async function (req, res) {
	if (req.body.name) {
		try {
			let batch = await Batches.findOne({ name: req.body.name });
			if (batch) {
				console.log(batch);
				return res.send(
					'<h3>Batch already exists, Kindle use another name, <a href="/tasks/batches">Go Back</a></h3>'
				);
			}
			await Batches.create({ name: req.body.name });
			req.flash("message", "Batch Created Successfully");
			return res.redirect("/tasks/batches");
		} catch (error) {
			console.log(error);
		}
	}
};

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
