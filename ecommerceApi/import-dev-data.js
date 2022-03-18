const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");
const fs = require("fs");

dotenv.config();

const DB = process.env.MONGO_URL;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then(() => console.log("DB connection successful!"));

// READ JSON FILE
const productsdata = JSON.parse(
	fs.readFileSync(`${__dirname}/data.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		await Product.create(productsdata, { validateBeforeSave: false });
		console.log("Data successfully loaded!");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await Product.deleteMany();
		console.log("Data successfully deleted!");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}
