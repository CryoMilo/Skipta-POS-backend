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
const setProduct = async (req, res, next) => {
	try {
		if (!req.body) {
			res.status(400).json({ message: "There is no input" });
			return;
		}

		const product = await Product.create({
			productName: req.body.productName,
			description: req.body.description,
			vege: req.body.vege,
			price: req.body.price,
			image: req.file.buffer, // Store the image as a Buffer
			contentType: req.file.mimetype, // Store the MIME type
		});

		res.status(200).json({ message: "New Product Created", data: product });
	} catch (error) {
		next(error);
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
				vege: req.body.vege,
				price: req.body.price,
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
	deleteProduct,
};
