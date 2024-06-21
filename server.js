const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000", // Front-end origin
		methods: ["GET", "POST"],
	})
);

const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: "http://localhost:3000", // Front-end origin
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("message", (msg) => {
		console.log("message: " + msg);
		io.emit("message", msg);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

// SERVER
const port = process.env.PORT || 5000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/order", require("./routes/orderRoutes"));
app.use(errorHandler);

server.listen(port, () => console.log(`Server started on port ${port}`));
