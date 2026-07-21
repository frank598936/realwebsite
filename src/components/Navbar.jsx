import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          InvestPro
        </Link>

        <nav className="navlink">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/plans">Plans</NavLink>
          {/* <NavLink to="/markets">Markets</NavLink> */}
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn btn">
            Login
          </Link>

          <Link to="/register" className="register-btn btn">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}