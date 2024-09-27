const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		ingredients: {
			type: Array, // Array of ingredients
			required: true,
		},
		taste: {
			type: String,
			required: true,
		},
		image: {
			type: String, // Base64-encoded image string
			required: false, // Not always necessary
		},
		vegan: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
