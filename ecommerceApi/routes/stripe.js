const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment", async (req, res) => {
	console.log(req.body);

	const intents = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: "inr",
		payment_method_types: ["card"],
		statement_descriptor: "Custom descriptor",
	});
	res.status(200).send(intents);
});

module.exports = router;
