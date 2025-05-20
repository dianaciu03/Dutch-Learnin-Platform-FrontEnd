import React, { createContext, useContext, useMemo, useEffect, useCallback } from 'react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../config/authConfig';
import useAuthStore from '../store/authStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const msalInstance = useMemo(() => new PublicClientApplication(msalConfig), []);
  const setAuth = useAuthStore(state => state.setAuth);
  const logout = useAuthStore(state => state.logout);

  const getStoredToken = useCallback(async () => {
    try {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        try {
          const response = await msalInstance.acquireTokenSilent({
            scopes: loginRequest.scopes,
            account: account
          });
          return response.idToken;
        } catch (error) {
          console.error('Error acquiring token silently:', error);
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error('Error retrieving stored token:', error);
      return null;
    }
  }, [msalInstance]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await msalInstance.initialize();
        console.log('MSAL initialized');
        
        // Check for active account
        const activeAccount = msalInstance.getActiveAccount();
        console.log('Active account:', activeAccount);
        
        if (activeAccount) {
          try {
            const response = await msalInstance.acquireTokenSilent({
              scopes: loginRequest.scopes,
              account: activeAccount
            });
            console.log('Token acquired silently:', response);
            setAuth(response.idToken);
          } catch (error) {
            console.error('Error acquiring token silently:', error);
            // If silent token acquisition fails, try interactive
            try {
              const response = await msalInstance.acquireTokenPopup({
                scopes: loginRequest.scopes,
                account: activeAccount
              });
              console.log('Token acquired via popup:', response);
              setAuth(response.idToken);
            } catch (popupError) {
              console.error('Error acquiring token popup:', popupError);
              // Try to get token from cache
              const storedToken = await getStoredToken();
              if (storedToken) {
                console.log('Restoring token from cache');
                setAuth(storedToken);
              }
            }
          }
        } else {
          // Try to get token from cache if no active account
          const storedToken = await getStoredToken();
          if (storedToken) {
            console.log('Restoring token from cache');
            setAuth(storedToken);
          }
        }

        // Handle redirect
        const response = await msalInstance.handleRedirectPromise();
        console.log('Redirect response:', response);
        if (response) {
          setAuth(response.idToken);
        }

        // Add event callbacks
        msalInstance.addEventCallback((event) => {
          console.log('MSAL event:', event);
          if (event.eventType === EventType.LOGIN_SUCCESS) {
            console.log('Login success, setting token:', event.payload.idToken);
            setAuth(event.payload.idToken);
          }
          if (event.eventType === EventType.LOGOUT_SUCCESS) {
            console.log('Logout success');
            logout();
          }
        });
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Try to get token from cache on error
        const storedToken = await getStoredToken();
        if (storedToken) {
          console.log('Restoring token from cache after error');
          setAuth(storedToken);
        }
      }
    };

    initializeAuth();
  }, [msalInstance, setAuth, logout, getStoredToken]);

  const login = async (flow = 'login') => {
    try {
      console.log('Starting login with flow:', flow);
      const request = {
        ...loginRequest,
        extraQueryParameters: {
          ...loginRequest.extraQueryParameters,
          p: flow === 'registerTeacher' ? 'Register-Teacher' : 'Default'
        }
      };
      console.log('Login request:', request);
      await msalInstance.loginRedirect(request);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Starting logout');
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