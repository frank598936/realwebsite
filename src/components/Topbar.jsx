import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function Topbar({ setOpen }) {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const pageTitles = {
    "/user": "Dashboard",

    "/deposit": "Deposit",

    "/withdraw": "Withdraw",

    "/profile": "Profile",

    "/admin": "Admin Dashboard",

    "/usersmanagement": "User Management",

    "/depositsmanagement": "Deposit Management",

    "/withdrawalsmanagement": "Withdrawal Management",

    "/earningsmanagement": "Profit & Bonus Management",
  };

  const currentPage = pageTitles[location.pathname] || "Home";

  function handleLogout() {
    logout();

    navigate("/");
  }

  return (
    <header className="topbar">
      {/* Mobile Menu Button */}

      <button className="menu-btn" onClick={() => setOpen(true)}>
        ☰
      </button>

      <div className="page-title">
        <h2>{currentPage}</h2>
      </div>

      <div className="user-area">
        <div className="user-details">
          <h4>{user?.name}</h4>        </div>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
