import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />

        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">Trusted Investment Platform</span>

            <h1>Grow Your Wealth With Smart Investments</h1>

            <p>
              Invest confidently with secure plans, professional portfolio
              management, fast withdrawals, and real-time account tracking.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">Start Investing</button>
              <button className="secondary-btn">View Plans</button>
            </div>

            <div className="hero-stats">
              <div>
                <h2>50K+</h2>
                <p>Active Investors</p>
              </div>

              <div>
                <h2>$250M+</h2>
                <p>Assets Managed</p>
              </div>

              <div>
                <h2>99.9%</h2>
                <p>Platform Uptime</p>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=800"
              alt="Investment dashboard"
            />
          </div>
        </section>

        <section className="features">
          <div className="section-title">
            <span>Our Features</span>
            <h2>Everything You Need To Invest Smarter</h2>
            <p>
              A complete investment platform built with security, transparency,
              and simplicity in mind.
            </p>
          </div>

          <div className="grid">
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Secure Investments</h3>
              <p>
                Advanced security systems protect your account and investments.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Smart Growth</h3>
              <p>
                Access professional investment plans designed for long-term
                growth.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Fast Transactions</h3>
              <p>
                Enjoy quick deposits, withdrawals, and transaction tracking.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Global Access</h3>
              <p>Manage your investments anytime from anywhere in the world.</p>
            </div>
          </div>
        </section>

        <section className="plans">
          <div className="section-title">
            <span>Investment Plans</span>
            <h2>Choose A Plan That Fits Your Goals</h2>
            <p>
              Select from flexible investment options designed for different
              levels of investors.
            </p>
          </div>

          <div className="grid">
            <div className="plan-card">
              <h3>Starter Plan</h3>

              <h4>$100 - $999</h4>

              <div className="plan-details">
                <p>✓ 5% Daily Return</p>
                <p>✓ Duration: 30 Days</p>
                <p>✓ 24/7 Support</p>
                <p>✓ Secure Platform</p>
              </div>

              <button>Invest Now</button>
            </div>
            <div className="plan-card">
              <h3>Silver Plan</h3>

              <h4>$1,000 - $4,999</h4>

              <div className="plan-details">
                <p>✓ 8% Daily Return</p>
                <p>✓ Duration: 60 Days</p>
                <p>✓ 24/7 Support</p>
                <p>✓ Secure Platform</p>
              </div>

              <button>Invest Now</button>
            </div>
            <div className="plan-card">
              <h3>Gold Plan</h3>

              <h4>$5,000 - $9,999</h4>

              <div className="plan-details">
                <p>✓ 12% Daily Return</p>
                <p>✓ Duration: 90 Days</p>
                <p>✓ 24/7 Support</p>
                <p>✓ Secure Platform</p>
              </div>

              <button>Invest Now</button>
            </div>
            <div className="plan-card">
              <h3>VIP Plan</h3>

              <h4>$10,000+</h4>

              <div className="plan-details">
                <p>✓ 15% Daily Return</p>
                <p>✓ Duration: 120 Days</p>
                <p>✓ 24/7 Support</p>
                <p>✓ Secure Platform</p>
              </div>

              <button>Invest Now</button>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <div className="section-title">
            <span>How It Works</span>
            <h2>Start Investing In Four Simple Steps</h2>
            <p>
              Our platform makes investing simple, transparent, and accessible
              for everyone.
            </p>
          </div>

          <div className="grid">
            <div className="step-card">
              <div className="step-number">01</div>

              <h3>Create Account</h3>

              <p>Register your account and complete your profile setup.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>

              <h3>Choose Investment Plan</h3>

              <p>Select a plan that matches your financial goals.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>

              <h3>Make Deposit</h3>

              <p>Fund your account using your preferred payment method.</p>
            </div>
            <div className="step-card">
              <div className="step-number">04</div>

              <h3>Earn Profits</h3>

              <p>Track your investment growth and receive your returns.</p>
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="why-content">
            <div className="why-text">
              <span>Why Choose Us</span>

              <h2>A Smarter Way To Manage Your Investments</h2>

              <p>
                We provide a simple and transparent platform designed to help
                users manage their investment journey with confidence.
              </p>

              <button>Learn More</button>
            </div>

            <div className="why-grid">
              <div className="why-card">
                <div className="why-icon"></div>

                <h3>Secure Platform</h3>

                <p>
                  Your account and investment information are protected with
                  modern security practices.
                </p>
              </div>

              <div className="why-card">
                <div className="why-icon"></div>

                <h3>Professional Management</h3>

                <p>
                  Our platform provides structured investment options with clear
                  tracking.
                </p>
              </div>

              <div className="why-card">
                <div className="why-icon"></div>

                <h3>Flexible Plans</h3>

                <p>
                  Choose investment options that match your personal financial
                  goals.
                </p>
              </div>

              <div className="why-card">
                <div className="why-icon"></div>

                <h3>Dedicated Support</h3>

                <p>Get assistance whenever you need help with your account.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="section-title">
            <span>Testimonials</span>

            <h2>What Our Users Say</h2>

            <p>
              See what investors think about their experience with our platform.
            </p>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="quote">"</div>

              <p>
                The platform is easy to use and I can track my investments
                clearly.
              </p>

              <h3>Michael Johnson</h3>

              <span>Investor</span>
            </div>

            <div className="testimonial-card">
              <div className="quote">"</div>

              <p>
                I love the simple dashboard and professional investment plans.
              </p>

              <h3>Sarah Williams</h3>

              <span>Business Owner</span>
            </div>

            <div className="testimonial-card">
              <div className="quote">"</div>

              <p>
                A clean platform with useful features and excellent support.
              </p>

              <h3>David Brown</h3>

              <span>Trader</span>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-content">
            <h2>Ready To Start Growing Your Wealth?</h2>

            <p>
              Join our investment platform today and take control of your
              financial future.
            </p>

            <button>Create Free Account</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}
