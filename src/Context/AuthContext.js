import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (email && password.length >= 6) {
      const userData = {
        uid: Date.now().toString(),
        email,
        displayName: email.split('@')[0],
        name: email.split('@')[0],
        phone: '',
        address: '',
        photoURL: '',
        createdAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return Promise.resolve(userData);
    }
    return Promise.reject(new Error('Invalid email or password'));
  };

  const register = (email, password, name, phone) => {
    if (email && password.length >= 6 && name) {
      const userData = {
        uid: Date.now().toString(),
        email,
        displayName: name,
        name,
        phone: phone || '',
        address: '',
        photoURL: '',
        createdAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return Promise.resolve(userData);
    }
    return Promise.reject(new Error('Please fill all required fields'));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('orders');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return Promise.resolve(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
