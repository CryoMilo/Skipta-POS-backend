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
		vege: {
			type: Boolean,
		},
		// image: {
		// 	type: Buffer,
		// 	require: [true, "Image is required"],
		// },
	},
	{ timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
