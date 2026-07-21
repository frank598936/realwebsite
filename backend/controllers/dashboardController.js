const supabase = require("../config/supabase");



// =====================================
// GET USER DASHBOARD
// =====================================

exports.getDashboard = async (req, res) => {


  try {


    // Get logged-in user from JWT

    const user_id = req.user.id;





    // Get user balance information

    const { data:user, error:userError } = await supabase

      .from("users")

      .select(
        `
        balance,
        profit,
        bonus
        `
      )

      .eq("id", user_id)

      .single();





    if(userError || !user){


      return res.status(404).json({

        message:"User not found"

      });


    }







    // Get deposits

    const { data:deposits, error:depositError } = await supabase

      .from("deposits")

      .select("*")

      .eq("user_id", user_id)

      .order("created_at", {

        ascending:false

      });







    if(depositError){


      return res.status(400).json({

        message:depositError.message

      });


    }







    // Get withdrawals

    const { data:withdrawals, error:withdrawalError } = await supabase

      .from("withdrawals")

      .select("*")

      .eq("user_id", user_id)

      .order("created_at", {

        ascending:false

      });







    if(withdrawalError){


      return res.status(400).json({

        message:withdrawalError.message

      });


    }









    // Approved deposits total

    const totalDeposits = deposits

      .filter(
        item => item.status === "Approved"
      )

      .reduce(

        (total,item)=>

        total + Number(item.amount),

        0

      );







    // Approved withdrawals total

    const totalWithdrawals = withdrawals

      .filter(

        item => item.status === "Approved"

      )

      .reduce(

        (total,item)=>

        total + Number(item.amount),

        0

      );







    // Pending counts

    const pendingDeposits = deposits.filter(

      item => item.status === "Pending"

    ).length;







    const pendingWithdrawals = withdrawals.filter(

      item => item.status === "Pending"

    ).length;









    res.json({


      balance: Number(user.balance || 0),


      profit: Number(user.profit || 0),


      bonus: Number(user.bonus || 0),



      totalDeposits,


      totalWithdrawals,



      pendingDeposits,


      pendingWithdrawals,



      recentDeposits: deposits.slice(0,5),


      recentWithdrawals: withdrawals.slice(0,5)



    });







  }catch(error){



    res.status(500).json({

      message:error.message

    });


  }


};