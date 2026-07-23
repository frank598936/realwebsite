import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container">
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMenu}>
          InvestPro
        </Link>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="home-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* MENU */}
        <div className={`mobile-wrapper ${menuOpen ? "open" : ""}`}>
          <nav className="navlink">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/about" onClick={closeMenu}>
              About
            </Link>

            <a href="#plans" onClick={closeMenu}>
              Plans
            </a>

            <a href="#footer" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <div className="nav-buttons">
            <Link to="/login" className="mobile-login-btn" onClick={closeMenu}>
              Login
            </Link>

            <Link
              to="/register"
              className="mobile-register-btn"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
