import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const API_BASE = 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cyberarena-token'));
  const [loading, setLoading] = useState(true);

  const fetchUser = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (!response.ok) throw new Error('Not authenticated');
      const profile = await response.json();
      setUser(profile);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem('cyberarena-token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchUser(token);
  }, [token]);

  const login = async (email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || 'Login failed');
    localStorage.setItem('cyberarena-token', payload.token);
    setToken(payload.token);
    setUser(payload.user);
    return payload;
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || 'Registration failed');
    localStorage.setItem('cyberarena-token', payload.token);
    setToken(payload.token);
    setUser(payload.user);
    return payload;
  };

  const logout = () => {
    localStorage.removeItem('cyberarena-token');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, loading, login, register, logout, isAuthenticated: Boolean(user) }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
