import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CustomerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    password2: ''
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
        setTimeout(() => navigate('/customer-dashboard'), 1500);
      } else {
        if (formData.password !== formData.password2) {
          setMessage({ type: 'error', text: 'Passwords do not match!' });
          setLoading(false);
          return;
        }
        
        await register(
          formData.username,
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          'customer'
        );
        
        setMessage({ type: 'success', text: 'Registration successful! Now logging in...' });
        await login(formData.username, formData.password);
        setTimeout(() => navigate('/customer-dashboard'), 1500);
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
        <p className="tagline">Customer Portal</p>
      </div>

      <div className="main-content">
        <div className="auth-form-wrapper">
          <h2>{isLogin ? 'Customer Login' : 'Create Account'}</h2>
          <p className="form-subtitle">{isLogin ? 'Access your account' : 'Join DRONE IT'}</p>

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
              className="btn-primary"
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
                  Register here
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
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
