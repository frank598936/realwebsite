import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer" id="footer">
        <div className="footer-container">
          <div>
              <h3>Contact Us</h3>

              <p>
                Our team is ready to help you.
              </p>
                <p>support@investpro.com</p>
              
                <p>+1 (800) 555-0199</p>
              

                <p>123 Financial Avenue, New York, USA</p>
      
          </div>

          <div className="foot">
            <h3>Company</h3>

            <a href="#plans">Plans</a>
            <a href="#footer">Contact</a>
          </div>

          <div className="foot">
            <h3>Support</h3>
            <Link to='/about'>About</Link>
            <Link to='/policy'>Privacy Policy</Link>
          </div>
        </div>

        <div className="copyright">© 2026 InvestPro. All rights reserved.</div>
      </footer>
    </>
  );
}
