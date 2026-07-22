import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);


  return (

    <header className="navbar">

      <div className="container">


        <Link to="/" className="logo">
          InvestPro
        </Link>


        {/* MOBILE MENU BUTTON */}
        <button
          className="home-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>



        <nav className={`navlink ${menuOpen ? "show-menu" : ""}`}>

          <NavLink 
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>


          <NavLink 
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>


          <NavLink 
            to="/plans"
            onClick={() => setMenuOpen(false)}
          >
            Plans
          </NavLink>


          <NavLink 
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>


        </nav>



        <div className="nav-buttons">

          <Link 
            to="/login" 
            className="login-btn btn"
          >
            Login
          </Link>


          <Link 
            to="/register" 
            className="register-btn btn"
          >
            Get Started
          </Link>


        </div>


      </div>

    </header>

  );
}