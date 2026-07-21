const supabase = require("../config/supabase");

// =====================================
// CREATE DEPOSIT
// =====================================

exports.createDeposit = async (req, res) => {
  try {
    const { user_id, name, amount, method, wallet_address } = req.body;

    if (!user_id || !amount || !method) {
      return res.status(400).json({
        message: "User ID, amount and method are required",
      });
    }

    const depositAmount = Number(amount);

    if (depositAmount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    // Create deposit only
    // DO NOT UPDATE USER BALANCE HERE

    const { data: deposit, error: depositError } = await supabase

      .from("deposits")

      .insert({
        user_id,

        name,

        amount: depositAmount,

        method,

        wallet_address,

        status: "Pending",
      })

      .select()

      .single();

    if (depositError) {
      return res.status(400).json({
        message: depositError.message,
      });
    }

    // Create transaction record

    const { error: transactionError } = await supabase

      .from("transactions")

      .insert({
        user_id,

        deposit_id: deposit.id,

        type: "Deposit",

        amount: depositAmount,

        method,

        status: "Pending",
      });

    if (transactionError) {
      return res.status(400).json({
        message: transactionError.message,
      });
    }

    res.status(201).json({
      message: "Deposit submitted successfully",

      deposit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET USER DEPOSITS
// =====================================

exports.getUserDeposits = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase

      .from("deposits")

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
// GET ALL DEPOSITS ADMIN
// =====================================

exports.getAllDeposits = async (req, res) => {
  try {
    const { data, error } = await supabase

      .from("deposits")

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
// APPROVE DEPOSIT
// =====================================

exports.approveDeposit = async (req, res) => {
  try {
    const { deposit_id } = req.params;

    const { data: deposit, error } = await supabase

      .from("deposits")

      .select("*")

      .eq("id", deposit_id)

      .single();

    if (error || !deposit) {
      return res.status(404).json({
        message: "Deposit not found",
      });
    }

    if (deposit.status === "Approved") {
      return res.status(400).json({
        message: "Deposit already approved",
      });
    }

    // Only change deposit status

    const { error: updateError } = await supabase

      .from("deposits")

      .update({
        status: "Approved",
      })

      .eq("id", deposit_id);

    if (updateError) {
      return res.status(400).json({
        message: updateError.message,
      });
    }

    // Update transaction

    await supabase

      .from("transactions")

      .update({
        status: "Approved",
      })

      .eq("deposit_id", deposit_id);

    res.json({
      message: "Deposit approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// REJECT DEPOSIT
// =====================================

exports.rejectDeposit = async (req, res) => {
  try {
    const { deposit_id } = req.params;

    const { error } = await supabase

      .from("deposits")

      .update({
        status: "Rejected",
      })

      .eq("id", deposit_id);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    await supabase

      .from("transactions")

      .update({
        status: "Rejected",
      })

      .eq("deposit_id", deposit_id);

    res.json({
      message: "Deposit rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
