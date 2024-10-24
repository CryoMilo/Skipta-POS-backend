const Order = require("../model/orderModel");

// GET
const getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		next(error);
		// Pass the Error into errorMiddleware
	}
};

// Get By Id
const getOrderById = async (req, res, next) => {
	try {
		const requiredDocument = await Order.findById(req.params.id);

		if (!requiredDocument) {
			res.status(404).json({ message: "Data Not Found!" });
			return;
		}

		res.status(200).json(requiredDocument);
	} catch (error) {
		next(error);
	}
};

// POST
const setOrder = async (req, res, next) => {
	try {
		if (!req.body) {
			res.status(400).json({ message: "There is no input" });
			return;
		}

		const order = await Order.create({
			customerName: req.body.customerName,
			productName: req.body.productName,
			vege: req.body.vege,
			products: req.body.products,
			orderCompleted: req.body.orderCompleted,
		});

		res.status(200).json({ message: "New Order Created", data: order });
	} catch (error) {
		next(error);
	}
};

// UPDATE
const updateOrder = async (req, res, next) => {
	try {
		const requiredDocument = await Order.findById(req.params.id);

		if (!requiredDocument) {
			res.status(404).json({ message: "Data Not Found!" });
			return;
		}

		const updateOptions = { new: false };
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ orderCompleted: req.body.orderCompleted },
			updateOptions
		);

		res.status(200).json({ message: "Order Updated!", data: order });
	} catch (error) {
		next(error);
	}
};

// DELETE
const deleteOrder = async (req, res, next) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.id);

		if (!order) {
			res.status(404).json({ message: "Data Not Found!" });
			return;
		}

		res.status(200).json({ message: "Order Deleted", data: order });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getOrders,
	setOrder,
	updateOrder,
	deleteOrder,
	getOrderById,
};
