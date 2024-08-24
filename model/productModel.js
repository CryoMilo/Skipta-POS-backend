const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		productName: {
			type: String,
			require: [true, "This field is required"],
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			require: [true, "This field is required"],
		},
		ingredients: {
			type: String,
		},
		taste: {
			type: String,
		},
		image: {
			type: Buffer,
		},
		contentType: {
			type: String, // Store the content type (e.g., 'image/jpeg')
		},
	},
	{ timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
