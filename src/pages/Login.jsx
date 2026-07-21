import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import Notification from "../components/Notification";

export default function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState({
    message: "",

    type: "",
  });

  async function handleLogin(e) {
    e.preventDefault();

    setNotification({
      message: "",

      type: "",
    });

    const result = await login(
      email,

      password,
    );

    if (!result.success) {
      setNotification({
        message: result.error,

        type: "error",
      });

      return;
    }

    setNotification({
      message: "Login successful",

      type: "success",
    });

    setTimeout(() => {
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }, 1000);
  }

  return (
    <div className="auth-page">
      <Notification message={notification.message} type={notification.type} />

      <div className="auth-box">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn" type="submit">
            Login
          </button>

          <p className="auth-footer">
            Don't have an account?
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
