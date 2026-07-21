const supabase = require("../config/supabase");

// =====================================
// CREATE WITHDRAWAL
// =====================================

exports.createWithdrawal = async (req, res) => {
  try {
    const {
      user_id,
      amount,
      method,
      withdrawal_type,
      wallet_address,
      network,
      bank_name,
      account_name,
      account_number,
      country,
    } = req.body;

    if (!user_id || !amount || !method) {
      return res.status(400).json({
        message: "User ID, amount and method are required",
      });
    }

    const withdrawAmount = Number(amount);

    // Get user balance
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("balance")
      .eq("id", user_id)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const currentBalance = Number(user.balance || 0);

    if (withdrawAmount <= 0) {
      return res.status(400).json({
        message: "Invalid withdrawal amount",
      });
    }

    if (withdrawAmount > currentBalance) {
      return res.status(400).json({
        message: "Insufficient funds",
      });
    }

    // IMPORTANT:
    // DO NOT deduct balance here.
    // Balance is deducted ONLY when the admin approves.

    const { data: withdrawal, error: withdrawalError } = await supabase
      .from("withdrawals")
      .insert({
        user_id,
        amount: withdrawAmount,
        method,
        withdrawal_type,
        wallet_address,
        network,
        bank_name,
        account_name,
        account_number,
        country,
        status: "Pending",
      })
      .select()
      .single();

    if (withdrawalError) {
      return res.status(400).json({
        message: withdrawalError.message,
      });
    }

    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        user_id,
        withdrawal_id: withdrawal.id,
        type: "Withdrawal",
        amount: withdrawAmount,
        method,
        status: "Pending",
      })
      .select()
      .single();

    if (transactionError) {
      return res.status(400).json({
        message: transactionError.message,
      });
    }

    res.status(201).json({
      message: "Withdrawal request submitted successfully",
      withdrawal,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET USER WITHDRAWALS
// =====================================

exports.getUserWithdrawals = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from("withdrawals")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET ALL WITHDRAWALS (ADMIN)
// =====================================

exports.getAllWithdrawals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("withdrawals")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// APPROVE WITHDRAWAL
// =====================================

exports.approveWithdrawal = async (req, res) => {
  try {
    const { withdrawal_id } = req.params;

    // Find withdrawal
    const { data: withdrawal, error: withdrawalError } = await supabase
      .from("withdrawals")
      .select("*")
      .eq("id", withdrawal_id)
      .single();

    if (withdrawalError || !withdrawal) {
      return res.status(404).json({
        message: "Withdrawal not found",
      });
    }

    if (withdrawal.status === "Approved") {
      return res.status(400).json({
        message: "Withdrawal already approved",
      });
    }

    if (withdrawal.status === "Rejected") {
      return res.status(400).json({
        message: "Rejected withdrawal cannot be approved",
      });
    }

    // Get current user balance
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("balance")
      .eq("id", withdrawal.user_id)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const currentBalance = Number(user.balance || 0);
    const amount = Number(withdrawal.amount);

    if (currentBalance < amount) {
      return res.status(400).json({
        message: "Insufficient user balance",
      });
    }

    // Deduct balance NOW
    const { error: balanceError } = await supabase
      .from("users")
      .update({
        balance: currentBalance - amount,
      })
      .eq("id", withdrawal.user_id);

    if (balanceError) {
      return res.status(400).json({
        message: balanceError.message,
      });
    }

    // Approve withdrawal
    const { error: updateError } = await supabase
      .from("withdrawals")
      .update({
        status: "Approved",
      })
      .eq("id", withdrawal_id);

    if (updateError) {
      return res.status(400).json({
        message: updateError.message,
      });
    }

    // Update transaction
    const { error: transactionError } = await supabase
      .from("transactions")
      .update({
        status: "Approved",
      })
      .eq("withdrawal_id", withdrawal_id);

    if (transactionError) {
      return res.status(400).json({
        message: transactionError.message,
      });
    }

    res.json({
      message: "Withdrawal approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// REJECT WITHDRAWAL
// =====================================

exports.rejectWithdrawal = async (req, res) => {
  try {
    const { withdrawal_id } = req.params;


    // Find withdrawal
    const { data: withdrawal, error: findError } = await supabase
      .from("withdrawals")
      .select("*")
      .eq("id", withdrawal_id)
      .single();


    if (findError || !withdrawal) {
      return res.status(404).json({
        message: "Withdrawal not found",
      });
    }


    if (withdrawal.status === "Rejected") {
      return res.status(400).json({
        message: "Withdrawal already rejected",
      });
    }


    if (withdrawal.status === "Approved") {
      return res.status(400).json({
        message: "Approved withdrawal cannot be rejected",
      });
    }



    // Update withdrawal status

    const { error: updateError } = await supabase
      .from("withdrawals")
      .update({
        status: "Rejected",
      })
      .eq("id", withdrawal_id);



    if (updateError) {
      return res.status(400).json({
        message: updateError.message,
      });
    }



    // Update transaction status

    const { error: transactionError } = await supabase
      .from("transactions")
      .update({
        status: "Rejected",
      })
      .eq("withdrawal_id", withdrawal_id);



    if (transactionError) {
      return res.status(400).json({
        message: transactionError.message,
      });
    }



    res.json({
      message: "Withdrawal rejected successfully",
    });



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};