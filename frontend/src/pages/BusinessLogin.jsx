import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function BusinessLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    password2: '',
    companyName: '',
    businessRegistrationNumber: '',
    taxId: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.username, formData.password);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/business-dashboard'), 1500);
      } else {
        if (formData.password !== formData.password2) {
          setMessage({ type: 'error', text: 'Passwords do not match!' });
          setLoading(false);
          return;
        }
        
        const companyData = {
          company_name: formData.companyName,
          business_registration_number: formData.businessRegistrationNumber,
          tax_id: formData.taxId
        };

        await register(
          formData.username,
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          'business',
          companyData
        );
        
        setMessage({ type: 'success', text: 'Registration successful! Now logging in...' });
        await login(formData.username, formData.password);
        setTimeout(() => navigate('/business-dashboard'), 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="back-btn">Back</Link>
      
      <div className="header">
        <h1 className="logo">DRONE IT</h1>
        <p className="tagline">Business Portal</p>
      </div>

      <div className="main-content">
        <div className="auth-form-wrapper business-theme">
          <h2>{isLogin ? 'Business Login' : 'Register Business'}</h2>
          <p className="form-subtitle">{isLogin ? 'Access your B2B account' : 'Register your business'}</p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Business Registration #</label>
                    <input
                      type="text"
                      name="businessRegistrationNumber"
                      value={formData.businessRegistrationNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tax ID</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-primary-business"
              disabled={loading}
            >
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          {message && (
            <div className={`message ${message.type === 'error' ? 'error' : 'success'}`}>
              {typeof message === 'string' ? message : message.text}
            </div>
          )}

          <div className="form-footer">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <a onClick={() => { setIsLogin(false); setMessage(''); }}>
                  Register your business
                </a>
              </>
            ) : (
              <>
                Already registered?{' '}
                <a onClick={() => { setIsLogin(true); setMessage(''); }}>
                  Login here
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>2024 DRONE IT. All rights reserved.</p>
      </footer>
    </div>
  );
}
