const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		productName: {
			type: String,
			require: [true, "This field is required"],
		},
		contains: {
			type: String,
			require: [true, "This field is required"],
		},
		vege: {
			type: Boolean,
		},
		image: {},
	},
	{ timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
