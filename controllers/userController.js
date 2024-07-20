const User = require("../model/userModel");

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
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "Email already registered" });
		}

		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			role: req.body.role,
		});

		res.status(200).json({ message: "New User Created", data: user });
	} catch (error) {
		next(error);
	}
};

module.exports = { createUser, getUsers };
