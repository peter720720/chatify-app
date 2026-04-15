import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isResettingPassword: false,
  isUpdatingProfile: false,

  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") ?? "true"),

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(newValue));
    set({ isSoundEnabled: newValue }); // This triggers the UI re-render
  },

  checkAuth: async () => {
    try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
    } catch (error) {
        console.log("Error checking authCheck:", error);
        set({ authUser: null });
    } finally {
        set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        toast.success(res.data.message || "Account created! Please log in.");
        return true; 
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      return false;
    } finally {
        set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
        set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      // data can be { profilePic: "..." } or { fullName: "..." }
      const res = await axiosInstance.put("/auth/update-profile", data); 
      
      set({ authUser: res.data });
      toast.success("Profile updated successfully!"); 
      return true;
    } catch (error) {
      console.log("Error in update profile:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

forgotPassword: async (email) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Password reset link sent to your email");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
      return false;
    }
  },

  resetPassword: async (token, password) => {
    set({ isResettingPassword: true });
    try {
      // The token usually comes from the URL /reset-password/:token
      const res = await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password updated successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
      return false;
    } finally {
      set({ isResettingPassword: false });
    }
  },

}));

export default useAuthStore;
