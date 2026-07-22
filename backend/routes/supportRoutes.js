const express = require("express");

const router = express.Router();

const {
  getOrCreateChat,

  sendMessage,

  getMessages,
} = require("../controllers/supportController");

router.post("/chat", getOrCreateChat);

router.post("/message", sendMessage);

router.get("/:chat_id", getMessages);

module.exports = router;
