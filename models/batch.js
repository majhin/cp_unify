const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Student",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
