const supabase = require("../config/supabase");



// =====================================
// GET ALL USERS
// =====================================

exports.getAllUsers = async (req, res) => {

  try {


    const { data, error } = await supabase

      .from("users")

      .select(`
        id,
        name,
        email,
        phone,
        country,
        role,
        balance,
        profit,
        bonus,
        blocked,
        created_at
      `)

      .order("created_at", {

        ascending:false

      });



    if(error){

      return res.status(400).json({

        message:error.message

      });

    }



    res.json(data);



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};









// =====================================
// BLOCK / UNBLOCK USER
// =====================================

exports.toggleBlockUser = async(req,res)=>{


  try{


    const { id } = req.params;




    const { data:user, error:getError } = await supabase

      .from("users")

      .select("blocked")

      .eq("id",id)

      .single();




    if(getError || !user){

      return res.status(404).json({

        message:"User not found"

      });

    }





    const { data, error } = await supabase

      .from("users")

      .update({

        blocked: !user.blocked

      })

      .eq("id",id)

      .select()

      .single();





    if(error){

      return res.status(400).json({

        message:error.message

      });

    }





    res.json({

      message:"User status updated",

      user:data

    });




  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};









// =====================================
// UPDATE PROFIT AND BONUS
// =====================================

exports.updateProfitBonus = async(req,res)=>{


  try{


    const {

      user_id,

      profit,

      bonus

    } = req.body;





    if(!user_id){

      return res.status(400).json({

        message:"User ID required"

      });

    }






    const { data:user, error:getError } = await supabase

      .from("users")

      .select(`

        balance,

        profit,

        bonus

      `)

      .eq("id",user_id)

      .single();






    if(getError || !user){

      return res.status(404).json({

        message:"User not found"

      });

    }







    const newProfit = Number(profit) || 0;


    const newBonus = Number(bonus) || 0;






    // Remove old profit and bonus

    const baseBalance =

      Number(user.balance || 0)

      -

      Number(user.profit || 0)

      -

      Number(user.bonus || 0);







    // Add new profit and bonus

    const newBalance =

      baseBalance

      +

      newProfit

      +

      newBonus;









    const { data, error } = await supabase

      .from("users")

      .update({

        profit:newProfit,

        bonus:newBonus,

        balance:newBalance

      })

      .eq("id",user_id)

      .select()

      .single();







    if(error){

      return res.status(400).json({

        message:error.message

      });

    }







    res.json({

      message:"Profit and bonus updated successfully",

      user:data

    });






  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};









// =====================================
// DELETE USER
// =====================================

exports.deleteUser = async(req,res)=>{


  try{


    const { id } = req.params;




    const { error } = await supabase

      .from("users")

      .delete()

      .eq("id",id);





    if(error){

      return res.status(400).json({

        message:error.message

      });

    }





    res.json({

      message:"User deleted successfully"

    });





  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};









// =====================================
// ADMIN DASHBOARD STATS
// =====================================

exports.getAdminStats = async(req,res)=>{


  try{



    const { count:totalUsers } = await supabase

      .from("users")

      .select("*",{

        count:"exact",

        head:true

      });







    const { data:deposits } = await supabase

      .from("deposits")

      .select("amount,status");







    const { data:withdrawals } = await supabase

      .from("withdrawals")

      .select("amount,status");








    const totalDeposits = deposits.reduce(

      (sum,item)=>

      sum + Number(item.amount),

      0

    );







    const approvedDeposits = deposits

      .filter(item=>item.status==="Approved")

      .reduce(

        (sum,item)=>

        sum + Number(item.amount),

        0

      );







    const pendingDeposits = deposits.filter(

      item=>item.status==="Pending"

    ).length;







    const totalWithdrawals = withdrawals.reduce(

      (sum,item)=>

      sum + Number(item.amount),

      0

    );







    const approvedWithdrawals = withdrawals

      .filter(item=>item.status==="Approved")

      .reduce(

        (sum,item)=>

        sum + Number(item.amount),

        0

      );







    const pendingWithdrawals = withdrawals.filter(

      item=>item.status==="Pending"

    ).length;








    res.json({

      totalUsers,

      totalDeposits,

      approvedDeposits,

      pendingDeposits,

      totalWithdrawals,

      approvedWithdrawals,

      pendingWithdrawals

    });





  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};