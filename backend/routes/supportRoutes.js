const express = require("express");

const router = express.Router();

const {
  createChat,

  sendMessage,

  getMessages,
} = require("../controllers/supportController");

router.post("/create", createChat);

router.post("/message", sendMessage);

router.get("/:chat_id", getMessages);

module.exports = router;
