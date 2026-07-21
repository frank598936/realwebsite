const express = require("express");

const router = express.Router();


const {
  createDeposit,
  getUserDeposits,
  getAllDeposits,
  approveDeposit,
  rejectDeposit
} = require("../controllers/depositController");


const adminMiddleware = require("../middleware/adminMiddleware");



// ===============================
// USER CREATE DEPOSIT
// ===============================

router.post(
  "/",
  createDeposit
);




// ===============================
// GET USER DEPOSITS
// ===============================

router.get(
  "/user/:user_id",
  getUserDeposits
);




// ===============================
// ADMIN GET ALL DEPOSITS
// ===============================

router.get(
  "/",
  adminMiddleware,
  getAllDeposits
);




// ===============================
// ADMIN APPROVE DEPOSIT
// ===============================

router.put(
  "/approve/:deposit_id",
  adminMiddleware,
  approveDeposit
);




// ===============================
// ADMIN REJECT DEPOSIT
// ===============================

router.put(
  "/reject/:deposit_id",
  adminMiddleware,
  rejectDeposit
);




module.exports = router;