const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		customerName: {
			type: String,
			required: [true, "Customer name is required"],
		},
		vegan: {
			type: Boolean,
			default: false, // Defaulting to false if not specified
		},
		orderCompleted: {
			type: Boolean,
			required: [true, "Order completion status is required"],
			default: false,
		},
		// Array of product references and their quantities
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId, // Referencing Product by its ObjectId
					ref: "Product", // Name of the Product model
					required: true,
				},
				quantity: {
					type: Number,
					required: [true, "Quantity is required"],
					min: [1, "Quantity cannot be less than 1"],
				},
			},
		],
	},
	{ timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
