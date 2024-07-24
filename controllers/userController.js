const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
		// Pass the Error into errorMiddleware
	}
};

const createUser = async (req, res, next) => {
	try {
		if (!req.body) {
			res.status(400).json({ message: "There is no input" });
			return;
		}

		// Check if the email is already registered
		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			return res.status(400).json({ error: "Email already registered" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const user = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
			role: req.body.role,
		});

		res.status(200).json({ message: "New User Created", data: user });
	} catch (error) {
		next(error);
	}
};

module.exports = { createUser, getUsers };
