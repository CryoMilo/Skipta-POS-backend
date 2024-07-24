const express = require("express");
const {
	createUser,
	getUsers,
	loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/").get(getUsers);

// router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
