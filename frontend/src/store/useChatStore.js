import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,

  isUserLoading: false,
  isMessagesLoading: false,

  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  // ───────────────────────────────
  // UI Functions
  // ───────────────────────────────
  toggleSound: () => {
    const newState = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newState);
    set({ isSoundEnabled: newState });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (user) => {
    // Clear old messages when switching user
    set({ selectedUser: user, messages: [] });

    // Re-subscribe socket listener for the new user
    get().unsubscribeFromMessages();
    get().subscribeToMessages();
  },

  // ───────────────────────────────
  // Fetch Contacts
  // ───────────────────────────────
  getAllContacts: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isUserLoading: false });
    }
  },

  // ───────────────────────────────
  // Fetch Chat Partners
  // ───────────────────────────────
  getChatPartners: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load chats");
    } finally {
      set({ isUserLoading: false });
    }
  },

  // ───────────────────────────────
  // Fetch Messages
  // ───────────────────────────────
  getMessagesByUserId: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`/messages/user/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ───────────────────────────────
  // Send a Message
  // ───────────────────────────────
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    if (!selectedUser) return;

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // Instant UI update
    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      const realMessage = res.data.message;

      // Replace optimistic message
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempId ? realMessage : msg
        ),
      }));
    } catch (error) {
      // Remove optimistic message
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));

      toast.error(error?.response?.data?.error || "Message failed");
    }
  },

  // ───────────────────────────────
  // SOCKET: Subscribe to messages
  // ───────────────────────────────
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser, isSoundEnabled } = get();

    if (!socket || !selectedUser) return;

    // Clear previous listeners to avoid duplicates
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));

      if (isSoundEnabled) {
        const notification = new Audio("/sounds/notification.mp3");
        notification.currentTime = 0;
        notification.play().catch(() => {});
      }
    });
  },

  // ───────────────────────────────
  // SOCKET: Unsubscribe
  // ───────────────────────────────
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
