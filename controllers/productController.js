const Product = require("../model/productModel");

// GET
const getProducts = async (req, res, next) => {
	try {
		const orders = await Product.find();
		res.status(200).json(orders);
	} catch (error) {
		next(error);
		// Pass the Error into errorMiddleware
	}
};

// POST
// const setProduct = async (req, res, next) => {
// 	try {
// 		if (!req.body) {
// 			res.status(400).json({ message: "There is no input" });
// 			return;
// 		}

// 		const order = await Product.create({
// 			customerName: req.body.customerName,
// 			menuName: req.body.menuName,
// 			vege: req.body.vege,
// 			soup: req.body.soup,
// 			orderCompleted: req.body.orderCompleted,
// 		});

// 		res.status(200).json({ message: "New Order Created", data: order });
// 	} catch (error) {
// 		next(error);
// 	}
// };

// UPDATE
// const updateProduct = async (req, res, next) => {
// 	try {
// 		const requiredDocument = await Order.findById(req.params.id);

// 		if (!requiredDocument) {
// 			res.status(404).json({ message: "Data Not Found!" });
// 			return;
// 		}

// 		const updateOptions = { new: false }; // Ensure updated document is returned
// 		const order = await Order.findByIdAndUpdate(
// 			req.params.id,
// 			{ orderCompleted: req.body.orderCompleted },
// 			updateOptions
// 		);

// 		res.status(200).json({ message: "Order Updated!", data: order });
// 	} catch (error) {
// 		next(error);
// 	}
// };

// DELETE
// const deleteProduct = async (req, res, next) => {
// 	try {
// 		const order = await Order.findByIdAndDelete(req.params.id);

// 		if (!order) {
// 			res.status(404).json({ message: "Data Not Found!" });
// 			return;
// 		}

// 		res.status(200).json({ message: "Order Deleted", data: order });
// 	} catch (error) {
// 		next(error);
// 	}
// };

module.exports = { getProducts };
