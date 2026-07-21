const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDashboard,
} = require("../controllers/dashboardController");

router.get("/:user_id", authMiddleware, getDashboard);

module.exports = router;