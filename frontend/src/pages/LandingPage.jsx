import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="container">
      <div className="header">
        <h1 className="logo">DRONE IT</h1>
        <p className="tagline">Autonomous Delivery Solutions</p>
      </div>

      <div className="main-content">
        <div className="auth-selection">
          <h2>Welcome to DRONE IT</h2>
          <p className="subtitle">Choose your role to get started</p>

          <div className="button-group">
            <Link to="/customer-login" className="btn btn-customer">
              <div className="btn-icon"></div>
              <div className="btn-text">
                <h3>Customer</h3>
                <p>Order food & packages with drone delivery</p>
              </div>
            </Link>

            <Link to="/business-login" className="btn btn-business">
              <div className="btn-icon"></div>
              <div className="btn-text">
                <h3>Business</h3>
                <p>B2B Drone Delivery Management</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>2024 DRONE IT. All rights reserved.</p>
      </footer>
    </div>
  );
}
