import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  setAuth: (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      set({
        isAuthenticated: true,
        user: {
          name: `${decodedToken.given_name} ${decodedToken.family_name}`,
          email: decodedToken.emails?.[0] || decodedToken.email,
          institution: decodedToken.extension_EducationalInstitution,
        },
        token,
        role: decodedToken.extension_Role || 'teacher',
      });
    } else {
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      });
    }
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      role: null,
    });
  },
}));

export default useAuthStore; 