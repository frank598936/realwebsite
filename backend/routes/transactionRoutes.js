const express = require("express");

const router = express.Router();


const {
  getUserTransactions
} = require("../controllers/transactionController");



// Get user transactions

router.get(
  "/:user_id",
  getUserTransactions
);



module.exports = router;