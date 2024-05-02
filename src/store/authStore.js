import { create } from "zustand";

// Retrieve user info from local storage
const initialUser = localStorage.getItem("user-info");

// Create the Zustand store
const useAuthStore = create((set) => ({
  user: initialUser, // Set the initial user value
  login: (user) => set({ user }), // Define the login action
  logout: () => set({ user: null }), // Define the logout action
  setUser: (user) => set({ user }), // Define the setUser action
}));

export default useAuthStore;
