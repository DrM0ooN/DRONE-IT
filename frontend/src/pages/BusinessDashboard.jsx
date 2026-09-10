import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MapComponent from '../components/MapComponent';

export default function BusinessDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
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
    { id: 'overview', label: 'Overview' },
    { id: 'shipments', label: 'Shipments' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' },
    { id: 'company', label: 'Company' }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>DRONE IT</h2>
          <p className="business-label">B2B Portal</p>
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
          <h1>{user?.company_name || user?.first_name}</h1>
          <p className="header-subtitle">B2B Drone Delivery Management</p>
        </div>

        <div className="dashboard-content">
          {/* Overview Section */}
          <section className={`section ${activeSection === 'overview' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Business Dashboard</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-value">0</p>
                <p className="stat-label">Active Shipments</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">0</p>
                <p className="stat-label">Total Deliveries</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">0%</p>
                <p className="stat-label">Success Rate</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">$0</p>
                <p className="stat-label">Cost Savings</p>
              </div>
            </div>
          </section>

          {/* Shipments Section */}
          <section className={`section ${activeSection === 'shipments' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Manage Shipments</h2>
            </div>
            <div className="shipment-form">
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>Shipment Type</label>
                    <select required>
                      <option value="">Select...</option>
                      <option value="food">Food Products</option>
                      <option value="medical">Medical Supplies</option>
                      <option value="retail">Retail Goods</option>
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
                  <label>Details</label>
                  <textarea rows="4" required></textarea>
                </div>
                <button type="submit" className="btn-primary-business">Create Shipment</button>
              </form>
            </div>
            <div className="items-list">
              <h3>Active Shipments</h3>
              <p className="empty-state">No shipments yet.</p>
            </div>
          </section>

          {/* Analytics Section */}
          <section className={`section ${activeSection === 'analytics' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Analytics & Reports</h2>
            </div>
            <div className="analytics-container">
              <div className="analytics-card">
                <h3>Delivery Performance</h3>
                <div className="chart-placeholder">Chart Data</div>
              </div>
              <div className="analytics-card">
                <h3>Cost Analysis</h3>
                <div className="chart-placeholder">Chart Data</div>
              </div>
            </div>
          </section>

          {/* Settings Section */}
          <section className={`section ${activeSection === 'settings' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Account Settings</h2>
            </div>
            <div className="settings-form">
              <form>
                <div className="form-group">
                  <label>API Key</label>
                  <div className="api-key-display">
                    <input type="text" value="sk_live_xxxxxxxxxxxxx" disabled />
                    <button type="button" className="btn-secondary">Copy</button>
                  </div>
                </div>
                <button type="submit" className="btn-primary-business">Save Changes</button>
              </form>
            </div>
          </section>

          {/* Company Section */}
          <section className={`section ${activeSection === 'company' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>Company Information & Service Hubs</h2>
            </div>
            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-field">
                  <label>Company Name:</label>
                  <p>{user?.company_name || 'Not provided'}</p>
                </div>
                <div className="profile-field">
                  <label>Registration Number:</label>
                  <p>{user?.business_registration_number || 'Not provided'}</p>
                </div>
                <div className="profile-field">
                  <label>Tax ID:</label>
                  <p>{user?.tax_id || 'Not provided'}</p>
                </div>
                <div className="profile-field">
                  <label>Contact Email:</label>
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
              </div>
              <button className="btn-secondary">Edit Information</button>
            </div>

            <h3>Available Delivery Hubs</h3>
            <div className="map-container">
              <MapComponent stations={stations} markerColor="#1b5e3f" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
