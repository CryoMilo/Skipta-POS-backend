const TestUpload = require("../model/testUploadModel");
const multer = require("multer");

const testUpload = async (req, res, next) => {
	try {
		if (!req.body) {
			res.status(400).json({ message: "There is no input" });
			return;
		}

		// Handling the image upload

		const testUpload = await TestUpload.create({
			image: req.file.buffer, // Store the image as a Buffer
			contentType: req.file.mimetype, // Store the MIME type
		});

		res.status(200).json({ message: "New Upload Created", data: testUpload });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	testUpload,
};
