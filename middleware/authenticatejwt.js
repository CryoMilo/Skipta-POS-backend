const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ error: "No Token" });
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) {
			return res.status(403).json({ error: err });
		}

		req.user = user;
		next();
	});
};

module.exports = authenticateJWT;
