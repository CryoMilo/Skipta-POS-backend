const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		customerName: {
			type: String,
			require: [true, "This field is required"],
		},
		menuName: {
			type: String,
			require: [true, "This field is required"],
		},
		vege: {
			type: Boolean,
		},
		soup: {
			type: Boolean,
		},
		orderCompleted: {
			type: Boolean,
			require: [true, "This field is required"],
		},
	},
	{ timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
