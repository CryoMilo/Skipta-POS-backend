const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const http = require("http");
const cors = require("cors");
// const socketIo = require("socket.io");
const authenticateJWT = require("./middleware/authenticatejwt");
const cookieParser = require("cookie-parser");
const multer = require("multer");

// Setup multer storage
const storage = multer.memoryStorage(); // or use diskStorage if you prefer to save to disk
const upload = multer({ storage });

const app = express();

app.use(cookieParser());

app.use(
	cors({
		origin: process.env.FRONTEND_ORIGIN, // Front-end origin
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

const server = http.createServer(app);

// const io = socketIo(server, {
// 	cors: {
// 		origin: process.env.FRONTEND_ORIGIN, // Front-end origin
// 		methods: ["GET", "POST"],
// 	},
// });

// io.on("connection", (socket) => {
// 	console.log("a user connected");

// 	socket.on("message", (msg) => {
// 		console.log("message: " + msg);
// 		io.emit("message", msg);
// 	});

// 	socket.on("disconnect", () => {
// 		console.log("user disconnected");
// 	});
// });

// SERVER
const port = process.env.PORT || 5000;

connectDB();

app.use(upload.any());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use("/api/order", authenticateJWT, require("./routes/orderRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use(errorHandler);

server.listen(port, () => console.log(`Server started on port ${port}`));
