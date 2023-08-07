const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
	{
		companyName: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
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

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
