// store/authStore.ts
import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthModalOpen: boolean;
  isLoginView: boolean;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  errorMessage: string;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  setEmail: (email: string) => void;
  getEmail: () => string;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  toggleView: () => void;
  reset: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  fetchUserDetails: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthModalOpen: false,
  isLoginView: true,
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  loading: false,
  errorMessage: "",

  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  setEmail: (email) => set({ email }),
  getEmail: () => get().email,
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setLoading: (loading) => set({ loading }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  toggleView: () => set((state) => ({ isLoginView: !state.isLoginView, errorMessage: "" })),
  reset: () => set({ email: "", password: "", firstName: "", lastName: "", loading: false, errorMessage: "" }),

  login: async (email, password) => {
    set({ loading: true, errorMessage: "" });
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/authentication", { email, password });
      const { token } = response.data;
      get().setToken(token); // Store token in Zustand and localStorage
      await get().fetchUserDetails(); // Fetch user details after login
      set({ isAuthModalOpen: false }); // Close the modal
      get().reset(); // Reset form fields
    } catch (error) {
      set({ errorMessage: "Login failed. Please check your credentials." });
    } finally {
      set({ loading: false });
    }
  },

  register: async (firstName, lastName, email, password) => {
    set({ loading: true, errorMessage: "" });
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", { 
      firstName, 
      lastName, 
      email, 
      password 
    });
    console.log("Registration Response:", response.data);
      const { token } = response.data;
      get().setToken(token); // Store token in Zustand and localStorage
      await get().fetchUserDetails(); // Fetch user details after registration
      set({ isAuthModalOpen: false }); // Close the modal
      get().reset(); // Reset form fields
    } catch (error) {
      set({ errorMessage: "Registration failed. Please try again." });
    } finally {
      set({ loading: false });
    }
  },

  fetchUserDetails: async () => {
    set({ loading: true, errorMessage: "" });
    try {
      const token = get().token;
      if (!token) throw new Error("No token found");

      const response = await axios.get("http://localhost:8080/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: response.data });
    } catch (error) {
      set({ errorMessage: "Failed to fetch user details." });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    get().setToken(null);
    get().setUser(null);
  },

}));