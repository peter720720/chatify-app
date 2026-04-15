import React from 'react';
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { MessageSquare } from "lucide-react";

const ChatList = () => {
  const { chats, isUsersLoading, setActiveTab, setSelectedUser, selectedUser } = useChatStore();

  // 🚀 FORCE SKELETON: If loading, show NOTHING but the skeleton
  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // Only show "No Conversation" if NOT loading and array is empty
  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <MessageSquare size={32} className="text-zinc-700 mb-4" />
        <h3 className="font-bold text-white">No Conversation Yet</h3>
        <button onClick={() => setActiveTab("contacts")} className="text-primary mt-2 hover:underline">
          Find contacts
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <button
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className={`w-full p-4 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors ${
            selectedUser?._id === chat._id ? "bg-zinc-800" : ""
          }`}
        >
          <img src={chat.profilePic || "/avatar.png"} className="size-12 rounded-full object-cover" />
          <div className="text-left">
            <div className="font-medium text-white">{chat.fullName}</div>
            <div className="text-xs text-zinc-500">Online</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;
