const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

// DB
const connection = require("./config/db");
connection();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
const users = require("./routes/userRoutes");
app.use("/api/users", users);

const auth=require("./routes/authRoutes")
app.use("/api/auth",auth)

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});