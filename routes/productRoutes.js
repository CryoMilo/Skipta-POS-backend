const express = require("express");
const {
	getProducts,
	setProduct,
	updateProduct,
	deleteProduct,
	getProductById,
} = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getProducts).post(setProduct);

router
	.route("/:id")
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct);

module.exports = router;
