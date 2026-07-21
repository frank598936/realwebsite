require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const depositRoutes = require("./routes/depositRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supportRoutes = require("./routes/supportRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://realwebsite-eight.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// ==============================
// ROUTES
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/deposits", depositRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/withdrawals", withdrawalRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/support", supportRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
