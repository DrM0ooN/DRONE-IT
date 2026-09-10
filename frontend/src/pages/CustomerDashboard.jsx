import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MapComponent from '../components/MapComponent';

export default function CustomerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('orders');
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hubs/');
      const data = await response.json();
      setStations(data.hubs || []);
    } catch (error) {
      console.error('Error loading stations:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { id: 'orders', label: 'Orders' },
    { id: 'tracking', label: 'Track Delivery' },
    { id: 'history', label: 'History' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>DRONE IT</h2>
        </div>
        <ul className="nav-menu">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => setActiveSection(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome, {user?.first_name || user?.username}!</h1>
          <p className="header-subtitle">Order food & packages with drone delivery</p>
        </div>

        <div className="dashboard-content">
          {/* Orders Section */}
          <section className={`section ${activeSection === 'orders' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Create New Order</h2>
            </div>
            <div className="order-form">
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>Order Type</label>
                    <select required>
                      <option value="">Select...</option>
                      <option value="food">Food Delivery</option>
                      <option value="package">Package Delivery</option>
                      <option value="documents">Documents</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Delivery Station</label>
                    <select required>
                      <option value="">Select a station...</option>
                      {stations.map(station => (
                        <option key={station.id} value={station.id}>
                          {station.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="4" required></textarea>
                </div>
                <button type="submit" className="btn-primary">Place Order</button>
              </form>
            </div>
            <div className="items-list">
              <h3>Your Recent Orders</h3>
              <p className="empty-state">No orders yet. Create one above!</p>
            </div>
          </section>

          {/* Tracking Section */}
          <section className={`section ${activeSection === 'tracking' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Track Your Delivery</h2>
            </div>
            <div className="tracking-info">
              <p className="empty-state">No active deliveries at the moment</p>
            </div>
          </section>

          {/* History Section */}
          <section className={`section ${activeSection === 'history' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Order History</h2>
            </div>
            <div className="items-list">
              <p className="empty-state">No history available</p>
            </div>
          </section>

          {/* Profile Section */}
          <section className={`section ${activeSection === 'profile' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Your Profile & Station Map</h2>
            </div>
            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-field">
                  <label>Name:</label>
                  <p>{user?.first_name} {user?.last_name}</p>
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <p>{user?.email}</p>
                </div>
                <div className="profile-field">
                  <label>Phone:</label>
                  <p>{user?.phone_number || 'Not provided'}</p>
                </div>
                <div className="profile-field">
                  <label>Address:</label>
                  <p>{user?.address || 'Not provided'}</p>
                </div>
                <div className="profile-field">
                  <label>Member Since:</label>
                  <p>{new Date(user?.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="btn-secondary">Edit Profile</button>
            </div>

            <div className="map-container">
              <h3>Drone Delivery Hubs Near You</h3>
              <MapComponent stations={stations} markerColor="#2d8659" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
