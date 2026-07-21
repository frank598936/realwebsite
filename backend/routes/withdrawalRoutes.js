const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");


const {

  createWithdrawal,

  getUserWithdrawals,

  getAllWithdrawals,

  approveWithdrawal,

  rejectWithdrawal

} = require("../controllers/withdrawalController");




// ===============================
// USER CREATE WITHDRAWAL
// ===============================

router.post(
  "/",
  createWithdrawal
);




// ===============================
// USER WITHDRAWAL HISTORY
// ===============================

router.get(
  "/:user_id",
  getUserWithdrawals
);




// ===============================
// ADMIN GET ALL WITHDRAWALS
// ===============================

router.get(
  "/",
  adminMiddleware,
  getAllWithdrawals
);




// ===============================
// ADMIN APPROVE WITHDRAWAL
// ===============================

router.put(
  "/approve/:withdrawal_id",
  adminMiddleware,
  approveWithdrawal
);




// ===============================
// ADMIN REJECT WITHDRAWAL
// ===============================

router.put(
  "/reject/:withdrawal_id",
  adminMiddleware,
  rejectWithdrawal
);



module.exports = router;