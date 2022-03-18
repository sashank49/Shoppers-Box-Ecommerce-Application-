const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const catchAsync = require("./catchAsync");

//REGISTER
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		username,
		email,
		password: await bcrypt.hash(password, 8),
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400).json("Error");
	}
	return;
});

//LOGIN

router.post("/login", async (req, res) => {
	try {
		console.log(req.body);
		const user = await User.findOne({
			username: req.body.username,
		});
		console.log(user);
		!user && res.status(401).json("Wrong User Name");

		const comp = await bcrypt.compare(req.body.password, user.password);
		console.log(comp);
		if (!comp) {
			res.status(401).json("Wrong Password");
		}
		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: "90d" }
		);
		console.log(accessToken);
		const { password, ...others } = user._doc;
		console.log(user._doc);
		res.status(200).json({ ...others, accessToken });
		console.log("111111");
	} catch (err) {
		res.status(500).json(err);
	}
	return;
});

module.exports = router;
