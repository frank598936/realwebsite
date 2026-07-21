const supabase = require("../config/supabase");


// =====================================
// GET ALL USERS (ADMIN)
// =====================================

exports.getAllUsers = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", {
        ascending: false
      });


    if(error){

      return res.status(400).json({
        message:error.message
      });

    }


    res.json(data);


  } catch(error){

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

    const {user_id}=req.params;


    const {data:user,error:userError}=await supabase

    .from("users")

    .select("blocked")

    .eq("id",user_id)

    .single();



    if(userError || !user){

      return res.status(404).json({

        message:"User not found"

      });

    }



    const {error}=await supabase

    .from("users")

    .update({

      blocked: !user.blocked

    })

    .eq("id",user_id);



    if(error){

      return res.status(400).json({

        message:error.message

      });

    }



    res.json({

      message:"User status updated"

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

exports.updateUserProfitBonus = async(req,res)=>{


try{


const {user_id}=req.params;


const {
profit,
bonus
}=req.body;



// Get current values

const {data:user,error:userError}=await supabase

.from("users")

.select("balance,profit,bonus")

.eq("id",user_id)

.single();



if(userError || !user){

return res.status(404).json({

message:"User not found"

});

}




const oldProfit = Number(user.profit || 0);

const oldBonus = Number(user.bonus || 0);


const newProfit = Number(profit || 0);

const newBonus = Number(bonus || 0);



const profitDifference =
newProfit - oldProfit;


const bonusDifference =
newBonus - oldBonus;



const newBalance =
Number(user.balance || 0)
+
profitDifference
+
bonusDifference;





const {error:updateError}=await supabase

.from("users")

.update({

profit:newProfit,

bonus:newBonus,

balance:newBalance

})

.eq("id",user_id);





if(updateError){

return res.status(400).json({

message:updateError.message

});

}




res.json({

message:"Profit and bonus updated successfully"

});



}catch(error){


res.status(500).json({

message:error.message

});


}


};