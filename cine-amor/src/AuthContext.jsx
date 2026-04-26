import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const parseJwtPayload = (token) => {
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(normalized));
  } catch (error) {
    console.error('No se pudo leer el token', error);
    return null;
  }
};

const getStoredAuth = () => {
  const token = localStorage.getItem('cineamor_token');
  const payload = parseJwtPayload(token);

  return {
    token,
    role: localStorage.getItem('cineamor_role') || payload?.rol || 'cliente',
    userId: localStorage.getItem('cineamor_userId') || payload?.id || '',
  };
};

export function AuthProvider({ children }) {
  const storedAuth = getStoredAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(storedAuth.token));
  const [role, setRole] = useState(storedAuth.role);
  const [userId, setUserId] = useState(String(storedAuth.userId || ''));

  const login = (authData) => {
    const token = authData?.token;
    const nextRole = authData?.rol || authData?.user?.rol || 'cliente';
    const nextUserId = authData?.userId || authData?.user?.id || '';

    if (token) {
      localStorage.setItem('cineamor_token', token);
    }

    localStorage.setItem('cineamor_role', nextRole);
    localStorage.setItem('cineamor_userId', String(nextUserId));
    setIsLoggedIn(true);
    setRole(nextRole);
    setUserId(String(nextUserId));
  };

  const logout = () => {
    localStorage.removeItem('cineamor_token');
    localStorage.removeItem('cineamor_role');
    localStorage.removeItem('cineamor_userId');
    setIsLoggedIn(false);
    setRole('cliente');
    setUserId('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
