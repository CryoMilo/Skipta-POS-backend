const express = require("express");
const { getProducts } = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getProducts);

// router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
