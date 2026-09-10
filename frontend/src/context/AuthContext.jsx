import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const DEMO_USERS = {
  customer: {
    id: 1001,
    username: 'customer',
    email: 'customer@demo.local',
    first_name: 'Demo',
    last_name: 'Customer',
    user_type: 'customer',
    phone_number: '',
    address: '',
    city: '',
    postal_code: '',
    company_name: '',
    business_registration_number: '',
    tax_id: '',
    created_at: new Date().toISOString()
  },
  business: {
    id: 1002,
    username: 'business',
    email: 'business@demo.local',
    first_name: 'Demo',
    last_name: 'Business',
    user_type: 'business',
    phone_number: '',
    address: '',
    city: '',
    postal_code: '',
    company_name: 'Demo Business',
    business_registration_number: 'DEMO-001',
    tax_id: 'DEMO-TAX',
    created_at: new Date().toISOString()
  }
};

const DEMO_PASSWORDS = {
  customer: 'customer123',
  business: 'business123'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const register = async (username, email, password, firstName, lastName, userType, companyData = {}) => {
    try {
      const body = {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password2: password,
        user_type: userType,
        ...companyData
      };

      const response = await fetch('http://localhost:8000/api/accounts/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/accounts/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || 'Invalid credentials');
      }

      const data = await response.json();
      const userData = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        user_type: data.user.user_type,
        phone_number: data.user.phone_number,
        address: data.user.address,
        city: data.user.city,
        postal_code: data.user.postal_code,
        company_name: data.user.company_name,
        business_registration_number: data.user.business_registration_number,
        tax_id: data.user.tax_id,
        created_at: data.user.created_at
      };

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(data.token);
      setUser(userData);

      return userData;
    } catch (error) {
      const demoUser = DEMO_USERS[username];

      // Preserve offline demo access only when the backend cannot be reached.
      if (demoUser && password === DEMO_PASSWORDS[username] && error.name === 'TypeError') {
        const demoToken = `demo-token-${username}`;
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        setToken(demoToken);
        setUser(demoUser);
        return demoUser;
      }

      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates) => {
    try {
      const response = await fetch('http://localhost:8000/api/accounts/user/update_profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const data = await response.json();
      const updatedUser = { ...user, ...data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
