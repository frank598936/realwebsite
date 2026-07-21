const supabase = require("../config/supabase");


exports.getUserTransactions = async (req, res) => {

  try {

    const { user_id } = req.params;


    const { data, error } = await supabase

      .from("transactions")

      .select("*")

      .eq("user_id", user_id)

      .order("created_at", { ascending: false });



    if(error){

      return res.status(400).json(error);

    }



    res.json(data);


  } catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};