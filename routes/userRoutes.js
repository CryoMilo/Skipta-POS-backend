const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");
const router = express.Router();

router.route("/").post(createUser).get(getUsers);

// router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
