import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ open, setOpen }) {
  const { user } = useContext(AuthContext);

  const userMenu = [
    {
      name: "Dashboard",
      path: "/user",
    },

    {
      name: "Deposit",
      path: "/deposit",
    },

    {
      name: "Withdraw",
      path: "/withdraw",
    },

    {
      name: "Support Chat",
      path: "/support",
    },

    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin",
    },

    {
      name: "Users",
      path: "/admin/users",
    },

    {
      name: "Deposits",
      path: "/admin/deposits",
    },

    {
      name: "Withdrawals",
      path: "/admin/withdrawals",
    },
  ];

  const menu = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <aside className={`sidebar ${open ? "show-sidebar" : ""}`}>
      <button className="close-menu" onClick={() => setOpen(false)}>
        ✕
      </button>

      <div className="sidebar-logo">
        <h2>Investment</h2>
      </div>

      <nav>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
