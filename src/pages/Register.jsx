import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";
import Notification from "../components/Notification";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",

    email: "",

    phone: "",

    country: "",

    password: "",

    confirmPassword: "",
  });

  const [notification, setNotification] = useState({
    message: "",

    type: "",
  });

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setNotification({
        message: "Passwords do not match",

        type: "error",
      });

      return;
    }

    try {
      await registerUser({
        name: form.name,

        email: form.email,

        phone: form.phone,

        country: form.country,

        password: form.password,
      });

      setNotification({
        message: "Registration successful",

        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Registration failed",

        type: "error",
      });
    }
  }

  return (
    <div className="auth-page">
      <Notification message={notification.message} type={notification.type} />

      <div className="auth-box">
        <form className="auth-form" onSubmit={handleRegister}>
          <h2>Create Account</h2>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Register
          </button>

          <p className="auth-footer">
            Already have account?
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
