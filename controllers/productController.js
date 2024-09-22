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

// Get Product By Id
const getProductById = async (req, res, next) => {
	try {
		const requiredDocument = await Product.findById(req.params.id);

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
const setProduct = async (req, res, next) => {
	try {
		// Basic input validation to check if req.body is present
		if (!req.body) {
			return res.status(400).json({ message: "There is no input" });
		}

		// Destructuring the necessary fields from req.body
		const { productName, description, price, ingredients, taste, image } =
			req.body;

		// Create the product in the database
		const product = await Product.create({
			productName,
			description,
			price,
			ingredients,
			taste,
			image, // Base64 encoded image
		});

		// Send the response back with a success message and the created product data
		return res
			.status(200)
			.json({ message: "New Product Created", data: product });
	} catch (error) {
		// Pass the error to the next middleware (global error handler)
		return next(error);
	}
};

// UPDATE
const updateProduct = async (req, res, next) => {
	try {
		const requiredDocument = await Product.findById(req.params.id);

		if (!requiredDocument) {
			res.status(404).json({ message: "Data Not Found!" });
			return;
		}

		const updateOptions = { new: false }; // Ensure updated document is returned
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				productName: req.body.productName,
				description: req.body.description,
				price: req.body.price,
				ingredients: req.body.ingredients,
				taste: req.body.ingredients,
			},
			updateOptions
		);

		res.status(200).json({ message: "Product Updated!", data: product });
	} catch (error) {
		next(error);
	}
};

// DELETE
const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);

		if (!product) {
			res.status(404).json({ message: "Data Not Found!" });
			return;
		}

		res.status(200).json({ message: "Product Deleted", data: product });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getProducts,
	setProduct,
	updateProduct,
	getProductById,
	deleteProduct,
};
