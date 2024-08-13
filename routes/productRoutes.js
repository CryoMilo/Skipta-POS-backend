const express = require("express");
const {
	getProducts,
	setProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getProducts).post(setProduct);

router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
