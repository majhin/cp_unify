const mongoose = require("mongoose");

async function main() {
	await mongoose.connect(process.env.MONGO_URL);
}
main().catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", () => {
	console.log("Connected to Database :: MongoDB");
});

module.exports = db;
