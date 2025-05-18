import React, { createContext, useContext, useMemo } from 'react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../config/authConfig';
import useAuthStore from '../store/authStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const msalInstance = useMemo(() => new PublicClientApplication(msalConfig), []);
  const setAuth = useAuthStore(state => state.setAuth);
  const logout = useAuthStore(state => state.logout);

  useMemo(() => {
    msalInstance.initialize().then(() => {
      msalInstance.handleRedirectPromise().then(response => {
        if (response) {
          setAuth(response.idToken);
        }
      });

      msalInstance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
          setAuth(event.payload.idToken);
        }
        if (event.eventType === EventType.LOGOUT_SUCCESS) {
          logout();
        }
      });
    });
  }, [msalInstance, setAuth, logout]);

  const login = async () => {
    try {
      await msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await msalInstance.logoutRedirect();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 