const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
		email: {
			type: String,
			required: true,
			unique: true,
		},
		college: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
		},
		courseScores: {
			DSA: {
				type: Number,
				default: 0,
			},
			WebD: {
				type: Number,
				default: 0,
			},
			React: {
				type: Number,
				default: 0,
			},
		},
		interview: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Interview",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
