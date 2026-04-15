
import { FileUser, UserPlus, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import useChatStore from '../store/useChatStore';

function NoConversationPlaceholder() {
  const fileInputRef = useRef(null);
  const { setActiveTab } = useChatStore();

  const handleSendDocument = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle file upload here
    }
  };

  const handleAddContact = () => {
    console.log("Add contact clicked");
    // Handle add contact
  };

  const handleAskAI = () => {
    setActiveTab('ai');
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-semibold text-slate-200 mb-2">Select a chat to start messaging</h2>
          <p className="text-slate-400">Open a conversation to send messages, or start a new one</p>
        </div>

        <div className="flex justify-center gap-6 flex-wrap">
          {/* SEND DOCUMENT */}
          <button
            onClick={handleSendDocument}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-700/30 border border-slate-600/50 hover:border-slate-500 transition-all hover:bg-slate-700/50"
          >
            <div className="p-3 rounded-full bg-cyan-500/20">
              <FileUser className="size-6 text-cyan-400" />
            </div>
            <span className="text-sm font-medium text-slate-300">Send document</span>
          </button>

          {/* ADD CONTACT */}
          <button
            onClick={handleAddContact}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-700/30 border border-slate-600/50 hover:border-slate-500 transition-all hover:bg-slate-700/50"
          >
            <div className="p-3 rounded-full bg-green-500/20">
              <UserPlus className="size-6 text-green-400" />
            </div>
            <span className="text-sm font-medium text-slate-300">Add contact</span>
          </button>

          {/* ASK AI */}
          <button
            onClick={handleAskAI}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-700/30 border border-slate-600/50 hover:border-slate-500 transition-all hover:bg-slate-700/50"
          >
            <div className="p-3 rounded-full bg-purple-500/20">
              <Sparkles className="size-6 text-purple-400" />
            </div>
            <span className="text-sm font-medium text-slate-300">Ask AI</span>
          </button>
        </div>
      </div>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

export default NoConversationPlaceholder