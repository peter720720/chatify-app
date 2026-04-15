// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import  toast  from "react-hot-toast";

// export const useAuthStore = create((set, get) => ({
//     allContacts: [],
//     messages: [],
//     activeTab: "chats",
//     selecteduser: null,
//     isUsersLoading: false,
//     isMessagesLoading: false,
//     isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

//     toggleSound: () => {
//         localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
//         set ({ isSoundEnabled: !state.isSoundEnabled });
//     },

//     satActiveTab: (tab) => set({ activeTab: tab }),

//     setSelectedUser: (selectedUser) => set({ selectedUser }),

//     getAllContacts: async () => {
//         set({ isUsersLoading: true });
//         try {
//             const res = await axiosInstance.get("/messages/contacts");
//             set({ allContacts: res.data });
//         } catch (error) {
//             toast.error("error.response.data.message");
//         } finally {
//             set({ isUsersLoading: false });
//         }
//     },
//     getMyChatPartners: async () => {
//         set({ isUsersLoading: true });
//         try {
//             const res = await axiosInstance.get("/messages/chats");
//             set({ chats: res.data });
//         } catch (error) {
//             toast.error("error.response.data.message");
//         } finally {
//             set({ isUsersLoading: false });
//         }
//     },
// }));

// export default useAuthStore;

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    messages: [],
    chats: [], 
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") ?? "true"),

    toggleSound: () => {
        const newValue = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", JSON.stringify(newValue));
        set({ isSoundEnabled: newValue }); 
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    // 🚀 NEW: Helper to load data based on the active tab
    getUsers: async () => {
        const { activeTab } = get();
        if (activeTab === "chats") {
            await get().getMyChatPartners();
        } else {
            await get().getAllContacts();
        }
    },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load contacts");
        } finally {
            // Delay slightly to prevent "flicker" on fast connections
            setTimeout(() => set({ isUsersLoading: false }), 200);
        }
    },
    
    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load chats");
        } finally {
            setTimeout(() => set({ isUsersLoading: false }), 200);
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },
}));

export default useChatStore;

 