import { createContext, useEffect, useState } from "react";

import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  async function login(email, password) {
    try {
      const response = await loginUser({
        email,

        password,
      });

      const { token, user } = response.data;

      console.log("LOGIN USER:", user);

      localStorage.setItem(
        "token",

        token,
      );

      localStorage.setItem(
        "user",

        JSON.stringify(user),
      );

      setUser(user);

      return {
        success: true,

        user,
      };
    } catch (error) {
      return {
        success: false,

        error: error.response?.data?.message || "Login failed",
      };
    }
  }

  function logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,

        setUser,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

