const mongoose = require("mongoose");

const testUploadSchema = mongoose.Schema(
	{
		image: {
			type: Buffer,
		},
		contentType: {
			type: String, // Store the content type (e.g., 'image/jpeg')
		},
	},
	{ timestamps: true }
);

const testUploadModel = mongoose.model("TestUpload", testUploadSchema);

module.exports = testUploadModel;
