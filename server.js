const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/orders", require("./routes/orderRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
