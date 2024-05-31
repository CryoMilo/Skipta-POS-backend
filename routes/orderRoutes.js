const express = require("express");
const {
	getOrders,
	setOrder,
	updateOrder,
	deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/").get(getOrders).post(setOrder);

router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
