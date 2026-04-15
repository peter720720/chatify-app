
// function ChatContainer() {
//   return (
//     <div>ChatContainer</div>
//   )
// }

// export default ChatContainer

import { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore"; // Adjusted to match your store path
import { ArrowLeft, MoreVertical, Phone, Video, Send } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <div className="flex-1 flex items-center justify-center text-slate-500">Loading messages...</div>;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950/20 backdrop-blur-sm">
      
      {/* HEADER SECTION */}
      <div className="p-3 md:p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* BACK BUTTON: This is what makes the mobile view work! */}
          <button 
            onClick={() => setSelectedUser(null)} 
            className="md:hidden p-2 -ml-2 hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6 text-slate-300" />
          </button>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full overflow-hidden border border-slate-700">
              <img src={selectedUser?.profilePic || "/avatar.png"} alt="profile" className="object-cover size-full" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-white">{selectedUser?.fullName}</h3>
              <p className="text-[10px] text-green-500 font-medium">Online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-4 text-slate-400">
          <button className="p-2 hover:bg-slate-700/50 rounded-full"><Video className="size-5" /></button>
          <button className="p-2 hover:bg-slate-700/50 rounded-full"><Phone className="size-5" /></button>
          <button className="p-2 hover:bg-slate-700/50 rounded-full"><MoreVertical className="size-5" /></button>
        </div>
      </div>

      {/* MESSAGES LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              message.senderId === authUser._id 
                ? "bg-cyan-600 text-white rounded-tr-none" 
                : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50"
            }`}>
              <p>{message.text}</p>
              <span className="text-[10px] opacity-50 mt-1 block text-right">
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* MESSAGE INPUT SECTION */}
      <div className="p-4 bg-transparent">
        <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-full px-5 py-3 text-sm outline-none focus:border-cyan-500/50 transition-all text-white"
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 p-3 rounded-full transition-colors shadow-lg">
            <Send className="size-5 text-white" />
          </button>
        </form>
      </div>

    </div>
  );
};

export default ChatContainer;
