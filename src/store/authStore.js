import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  setAuth: (token) => {
    console.log('Setting auth with token:', token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        
        const userData = {
          name: decodedToken.name || `${decodedToken.given_name} ${decodedToken.family_name}`,
          email: decodedToken.emails?.[0] || decodedToken.email,
          institution: decodedToken.extension_EducationalInstitution,
        };
        
        console.log('Setting user data:', userData);
        
        set({
          isAuthenticated: true,
          user: userData,
          token,
          role: decodedToken.extension_Role || 'teacher',
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          role: null,
        });
      }
    } else {
      console.log('No token provided, clearing auth state');
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      });
    }
  },
  logout: () => {
    console.log('Logging out, clearing auth state');
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      role: null,
    });
  },
}));

export default useAuthStore; 