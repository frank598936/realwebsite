import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/authApi";

export default function Support() {
  const { user } = useContext(AuthContext);

  const [chatId, setChatId] = useState(null);

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  // CREATE CHAT

  async function createChat() {
    try {
      const response = await API.post("/support/create", {
        user_id: user.id,
      });

      setChatId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  // LOAD MESSAGES

  async function loadMessages() {
    if (!chatId) return;

    try {
      const response = await API.get(`/support/${chatId}`);

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // SEND MESSAGE

  async function sendMessage() {

  console.log("chatId:", chatId);
  console.log("message:", message);

  if (!message) return;

  try {
    await API.post("/support/message", {
      chat_id: chatId,
      sender: "user",
      message,
    });

    setMessage("");

    loadMessages();

  } catch (error) {
    console.log(error.response?.data);
  }
}
  useEffect(() => {
    if (user) {
      createChat();
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [chatId]);

  return (
    <div className="support-container">
      <h2>💬 Support Chat</h2>

      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.sender === "user" ? "user-message" : "admin-message"}
          >
            <p>{msg.message}</p>

            <small>{new Date(msg.created_at).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
