import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      set({ authUser: res.data });
      toast.success("Account created Successfully");
    } catch (error) {
      toast.error(error.response.data.message); // how to access errors in axios
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully");
    } catch (error) {
      toast.error(error.response.data.message); // how to access errors in axios
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
    } catch (error) {
      toast.error(error.response.data.message); // how to access errors in axios
    }
  },

  updateProfilePic: async (data) => {
    set({isUpdatingProfile : true})
    try {
      const res = await axiosInstance.put("/users/profile/update", data);
      set({ authUser: res.data });
      toast.success("profile picture updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }finally{
      set({isUpdatingProfile : false})
    }
  },
}));
