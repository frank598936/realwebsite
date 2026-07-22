const supabase = require("../config/supabase");

// =====================================
// CREATE SUPPORT CHAT
// =====================================

exports.createChat = async (req, res) => {
  try {
    const { user_id } = req.body;

    console.log("USER ID RECEIVED:", user_id);

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const { data, error } = await supabase
      .from("support_chats")
      .insert({
        user_id,
        status: "open",
      })
      .select()
      .single();

    if (error) {
      console.log("SUPABASE ERROR:", error);

      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {
    console.log("SERVER ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};
// =====================================
// SEND MESSAGE
// =====================================

exports.sendMessage = async (req, res) => {
  try {
    const { chat_id, sender, message } = req.body;

    if (!chat_id || !sender || !message) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const { data, error } = await supabase

      .from("support_messages")

      .insert({
        chat_id,
        sender,
        message,
      })

      .select()

      .single();

    if (error) {
      console.log("SEND MESSAGE ERROR:", error);

      return res.status(400).json({
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET CHAT MESSAGES
// =====================================

exports.getMessages = async (req, res) => {
  try {
    const { chat_id } = req.params;

    const { data, error } = await supabase

      .from("support_messages")

      .select("*")

      .eq("chat_id", chat_id)

      .order("created_at", {
        ascending: true,
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
// GET OR CREATE USER CHAT
// =====================================

exports.getOrCreateChat = async (req, res) => {

  try {

    const { user_id } = req.body;


    if(!user_id){
      return res.status(400).json({
        message:"User ID required"
      });
    }


    // Check existing open chat

    const { data: existingChat } = await supabase
      .from("support_chats")
      .select("*")
      .eq("user_id", user_id)
      .eq("status","open")
      .maybeSingle();



    if(existingChat){

      return res.json(existingChat);

    }



    // Create new chat

    const { data:chat, error } = await supabase
      .from("support_chats")
      .insert({
        user_id,
        status:"open"
      })
      .select()
      .single();



    if(error){

      return res.status(400).json({
        message:error.message
      });

    }


    res.json(chat);



  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
