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
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>

            <NavLink to="/plans" onClick={closeMenu}>
              Plans
            </NavLink>

            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
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
