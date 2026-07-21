const supabase = require("../config/supabase");

// =====================================
// CREATE SUPPORT CHAT
// =====================================

exports.createChat = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID required",
      });
    }

    const { data: chat, error } = await supabase
      .from("support_chats")
      .insert({
        user_id,
        status: "open",
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
      return res.status(400).json({
        message: error.message,
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
