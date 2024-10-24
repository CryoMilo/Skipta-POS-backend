const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		const payload = { id: user._id, firstName: user.firstName };
		const secretKey = process.env.SECRET_KEY;
		const expiration = "1h";
		const token = jwt.sign(payload, secretKey, { expiresIn: expiration });

		res.cookie("token", token, {
			httpOnly: true,
			secure: false,
			sameSite: "Lax",
			maxAge: 3600000,
		});

		res.send({
			message: "Login successful",
			user: {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
				token: token,
			},
		});
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
		if (!req.body) {
			res.status(400).json({ message: "There is no input" });
			return;
		}

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

const logoutUser = async (req, res, next) => {
	res.cookie("token", "", {
		httpOnly: false,
		secure: false,
		sameSite: "Lax",
		expires: new Date(0),
	});

	res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { createUser, getUsers, loginUser, logoutUser };
