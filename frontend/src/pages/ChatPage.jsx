// import { useState, useEffect, useRef } from 'react';
// import EmojiPicker from 'emoji-picker-react';
// import { 
//   MessageSquareIcon, PhoneIcon, CircleDot, ArchiveIcon, Lock, Sparkles, 
//   Search, User, Shield, Bell, LogOut, ArrowLeft, Camera, Pencil, Copy, Check, X, Smile,
//   Volume2Icon, VolumeOffIcon 
// } from 'lucide-react';
// import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
// import ProfileHeader from '../components/ProfileHeader';
// import ActiveTabSwitch from '../components/ActiveTabSwitch';
// import ChatList from '../components/ChatList';
// import ContactsList from '../components/ContactsList';
// import ChatContainer from '../components/ChatContainer';
// import AIChatContainer from '../components/AIChatContainer';
// import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
// import useChatStore from '../store/useChatStore';
// import { useAuthStore } from '../store/useAuthStore';
// import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";

// const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

// function ChatPage() {
//   const { activeTab, selectedUser, messages, setActiveTab } = useChatStore();
//   const { authUser, logout, isSoundEnabled, toggleSound, updateProfilePicture, updateProfile } = useAuthStore();
  
//   const [isClient, setIsClient] = useState(false);
//   const [settingsSubView, setSettingsSubView] = useState("main");

//   // EDITING & EMOJI STATES
//   const [isEditingName, setIsEditingName] = useState(false);
//   const [editedName, setEditedName] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  
//   const editFileInputRef = useRef(null);
//   const emojiPickerRef = useRef(null);

//   useEffect(() => {
//     setIsClient(true);
//     if (authUser) setEditedName(authUser.fullName);
//   }, [authUser]);

//   // Close emoji picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       await updateProfilePicture({ profilePic: reader.result });
//     };
//   };

//   const handleUpdateName = async () => {
//     if (!editedName.trim() || editedName === authUser?.fullName) {
//       setIsEditingName(false);
//       setShowEmojiPicker(false);
//       return;
//     }
//     await updateProfile({ fullName: editedName });
//     setIsEditingName(false);
//     setShowEmojiPicker(false);
//   };

//   const onEmojiClick = (emojiData) => {
//     setEditedName(prev => prev + emojiData.emoji);
//   };

//   if (!isClient) return null;

//   const sidebarItems = [
//     { key: "chats", label: "Chats", icon: MessageSquareIcon, count: messages?.length ?? 0 },
//     { key: "calls", label: "Calls", icon: PhoneIcon },
//     { key: "status", label: "Status", icon: CircleDot },
//     { key: "archive", label: "Archive", icon: ArchiveIcon },
//     { key: "locked", label: "Locked", icon: Lock },
//     { key: "ai", label: "AI", icon: Sparkles },
//   ];

//   return (
//     <div className="relative w-full min-h-screen">
//       <BorderAnimatedContainer>
//         <div className="flex h-screen w-full text-white">
          
//           {/* LEFT SIDEBAR NAVIGATION */}
//           <div className="w-24 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center py-4 border-r border-slate-700/50 gap-6">
//             <div className="flex flex-col items-center gap-6">
//               {sidebarItems.map((item) => (
//                 <button
//                   key={item.key}
//                   onClick={() => { setActiveTab(item.key); setSettingsSubView("main"); }}
//                   className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/70 transition-colors ${activeTab === item.key ? 'bg-cyan-500/30 border-cyan-400' : 'bg-slate-800/50 hover:bg-slate-700/60'}`}
//                 >
//                   <item.icon className="size-6 text-white" />
//                 </button>
//               ))}
//             </div>

//             <div className="flex-1 flex items-end justify-center pb-6">
//               <button
//                 onClick={() => { setActiveTab("settings"); setSettingsSubView("main"); }}
//                 className={`rounded-full border-2 transition-all ${activeTab === "settings" ? 'border-cyan-400 p-0.5' : 'border-transparent'}`}
//               >
//                 <ProfileHeader isVertical />
//               </button>
//             </div>
//           </div>

//           {/* MIDDLE COLUMN (LISTS & SETTINGS) */}
//           <div className="flex flex-1">
//             <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700/50">
//               {activeTab !== "settings" ? (
//                 <>
//                   <ActiveTabSwitch />
//                   <div className="flex-1 overflow-y-auto p-4"><ChatList /></div>
//                 </>
//               ) : (
//                 <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-300">
//                   {settingsSubView === "main" ? (
//                     <div className="p-6">
//                       <h1 className="text-2xl font-bold mb-6">Settings</h1>
//                       <div className="relative mb-6">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
//                         <input type="text" placeholder="Search settings" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm outline-none" />
//                       </div>

//                       <button onClick={() => setSettingsSubView("edit-profile")} className="w-full flex items-center gap-4 p-3 hover:bg-slate-700/40 rounded-xl transition-colors mb-6 text-left">
//                         <div className="size-16 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-lg">
//                            <img src={authUser?.profilePic || "/avatar.png"} className="object-cover size-full" alt="Profile" />
//                         </div>
//                         <div>
//                           <h2 className="font-semibold text-lg">My Profile</h2>
//                           <p className="text-slate-400 text-xs">Manage account details</p>
//                         </div>
//                       </button>

//                       <div className="space-y-1">
//                         <SettingsItem icon={<User className="size-5" />} label="Account" />
//                         <SettingsItem icon={<Shield className="size-5" />} label="Privacy" />
//                         <button onClick={() => { mouseClickSound.play().catch(()=>{}); toggleSound(); }} className="w-full flex items-center justify-between p-3 hover:bg-slate-700/40 rounded-xl group transition-colors">
//                           <div className="flex items-center gap-4">
//                             <span className="text-slate-500 group-hover:text-cyan-400">
//                               {isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />}
//                             </span>
//                             <span className="font-medium text-slate-300 text-sm">Sound Effects</span>
//                           </div>
//                           <div className={`w-8 h-4 rounded-full transition-colors ${isSoundEnabled ? 'bg-cyan-500' : 'bg-slate-600'}`}>
//                              <div className={`size-3 bg-white rounded-full mt-0.5 transition-transform ${isSoundEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
//                           </div>
//                         </button>
//                         <SettingsItem icon={<Bell className="size-5" />} label="Notifications" />
//                         <button onClick={logout} className="w-full flex items-center gap-4 p-3 text-red-400 hover:bg-red-400/10 rounded-xl mt-4">
//                           <LogOut className="size-5" />
//                           <span className="font-medium text-sm">Log out</span>
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     /* EDIT PROFILE VIEW */
//                     <div className="flex flex-col h-full bg-slate-900/40">
//                       <input type="file" ref={editFileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

//                       <div className="p-6 flex items-center gap-4 border-b border-slate-700/50">
//                         <button onClick={() => { setIsEditingName(false); setSettingsSubView("main"); }} className="hover:bg-slate-700/50 p-2 rounded-full">
//                           <ArrowLeft className="size-5" />
//                         </button>
//                         <h1 className="text-lg font-semibold">Edit profile</h1>
//                       </div>

//                       <div className="p-8 flex flex-col items-center overflow-y-visible">
//                         <div className="relative group cursor-pointer mb-10" onClick={() => editFileInputRef.current.click()}>
//                           <div className="size-40 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl transition-opacity group-hover:opacity-90">
//                             <img src={authUser?.profilePic || "/avatar.png"} className="size-full object-cover" alt="Profile" />
//                           </div>
//                           <div className="absolute bottom-2 right-2 bg-slate-800 border border-slate-600 p-2.5 rounded-full shadow-lg">
//                             <Camera className="size-5 text-cyan-400" />
//                           </div>
//                         </div>

//                         <div className="w-full space-y-8 text-left px-2 relative">
//                           {/* NAME SECTION */}
//                           <div className="space-y-1">
//                             <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Name</label>
                            
//                             {/* RED UNDERLINE LOGIC */}
//                             <div className={`flex items-center justify-between border-b pb-2 transition-colors ${isEditingName ? 'border-red-500' : 'border-slate-700'}`}>
//                               {isEditingName ? (
//                                 <div className="flex items-center justify-between w-full">
//                                   <input 
//                                     type="text" value={editedName} 
//                                     onChange={(e) => setEditedName(e.target.value)} 
//                                     className="bg-transparent text-white border-none outline-none focus:ring-0 w-full text-base"
//                                     autoFocus
//                                     onKeyDown={(e) => {
//                                       if (e.key === 'Enter') handleUpdateName();
//                                       if (e.key === 'Escape') { setIsEditingName(false); setEditedName(authUser.fullName); }
//                                     }}
//                                   />
//                                   <div className="flex gap-2 items-center">
//                                     <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-slate-400 hover:text-cyan-400">
//                                       <Smile className="size-5" />
//                                     </button>
//                                     <button onClick={handleUpdateName} className="text-cyan-400"><Check className="size-5" /></button>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div className="flex items-center justify-between w-full group">
//                                   <span className="text-white text-base">{authUser?.fullName}</span>
//                                   <button onClick={() => setIsEditingName(true)}>
//                                     <Pencil className="size-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
//                                   </button>
//                                 </div>
//                               )}
//                             </div>

//                             {/* EMOJI PICKER POPUP */}
//                             {showEmojiPicker && (
//                               <div ref={emojiPickerRef} className="absolute z-[100] mt-2 right-0 shadow-2xl">
//                                 <EmojiPicker 
//                                   theme="dark" 
//                                   onEmojiClick={onEmojiClick}
//                                   width={280}
//                                   height={350}
//                                   skinTonesDisabled
//                                   searchDisabled
//                                 />
//                               </div>
//                             )}
//                           </div>

//                           {/* PHONE SECTION */}
//                           <div className="space-y-1 relative">
//                             <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Phone</label>
//                             <div className="flex items-center justify-between border-b border-slate-700 pb-2 group">
//                               <span className="text-white text-base">+234 816 425 3731</span>
//                               <button onClick={() => {
//                                 navigator.clipboard.writeText("+234 816 425 3731");
//                                 setShowCopyFeedback(true);
//                                 setTimeout(() => setShowCopyFeedback(false), 2000);
//                               }}>
//                                 <Copy className="size-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
//                               </button>
//                             </div>
//                             {showCopyFeedback && (
//                               <div className="absolute -bottom-6 left-0 animate-in fade-in slide-in-from-top-1 duration-200">
//                                 <span className="text-[10px] bg-cyan-500 text-slate-900 font-bold px-2 py-0.5 rounded shadow-lg">Copied!</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* CHAT AREA */}
//             <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
//               {activeTab === "chats" ? (selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />) : 
//                activeTab === "settings" ? (
//                  <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
//                     <User className="size-16 opacity-5 mb-4" />
//                     <p className="uppercase tracking-widest text-[10px] opacity-30 font-bold">Profile Details View</p>
//                  </div>
//                ) : <div className="flex-1 flex items-center justify-center opacity-30 italic">Module Loaded...</div>}
//             </div>
//           </div>
//         </div>
//       </BorderAnimatedContainer>
//     </div>
//   );
// }

// function SettingsItem({ icon, label }) {
//   return (
//     <button className="w-full flex items-center gap-4 p-3 text-slate-300 hover:bg-slate-700/30 rounded-xl transition-colors">
//       <span className="text-slate-500">{icon}</span>
//       <span className="font-medium text-sm">{label}</span>
//     </button>
//   );
// }

// export default ChatPage;


import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { 
  MessageSquareIcon, PhoneIcon, CircleDot, ArchiveIcon, Lock, Sparkles, 
  Search, User, Shield, Bell, LogOut, ArrowLeft, Camera, Pencil, Copy, Check, X, Smile,
  Volume2Icon, VolumeOffIcon, MoreVertical, Settings
} from 'lucide-react';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ChatContainer from '../components/ChatContainer';
import AIChatContainer from '../components/AIChatContainer';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
import useChatStore from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ChatPage() {
  const { activeTab, selectedUser, messages, setActiveTab } = useChatStore();
  const { authUser, logout, isSoundEnabled, toggleSound, updateProfilePicture, updateProfile } = useAuthStore();
  
  const [isClient, setIsClient] = useState(false);
  const [settingsSubView, setSettingsSubView] = useState("main");
  const [showDropdown, setShowDropdown] = useState(false);

  // EDITING & EMOJI STATES
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  
  const editFileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    if (authUser) setEditedName(authUser.fullName);
  }, [authUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      await updateProfilePicture({ profilePic: reader.result });
    };
  };

  const handleUpdateName = async () => {
    if (!editedName.trim() || editedName === authUser?.fullName) {
      setIsEditingName(false);
      setShowEmojiPicker(false);
      return;
    }
    await updateProfile({ fullName: editedName });
    setIsEditingName(false);
    setShowEmojiPicker(false);
  };

  const onEmojiClick = (emojiData) => {
    setEditedName(prev => prev + emojiData.emoji);
  };

  if (!isClient) return null;

  const sidebarItems = [
    { key: "chats", label: "Chats", icon: MessageSquareIcon },
    { key: "calls", label: "Calls", icon: PhoneIcon },
    { key: "status", label: "Status", icon: CircleDot },
    { key: "ai", label: "AI", icon: Sparkles },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <BorderAnimatedContainer>
        <div className="flex flex-col md:flex-row h-full w-full text-white">
          
          {/* 1. TOP HEADER (Mobile Only) - WhatsApp Redesign Style */}
          {!selectedUser && (
            <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-50">
              <h1 className="text-2xl font-bold text-white tracking-tight">Chatify</h1>
              <div className="flex items-center gap-5 relative">
                {/* Camera Icon - Triggers Native Camera */}
                <label className="cursor-pointer hover:opacity-70 transition-opacity">
                  <Camera className="size-6 text-slate-200" />
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageUpload} />
                </label>

                {/* Search Icon (Optional, matching WhatsApp) */}
                <button className="hover:opacity-70 transition-opacity">
                  <Search className="size-6 text-slate-200" />
                </button>

                {/* Dropdown Menu (Three Dots) */}
                <div className="relative">
                  <button onClick={() => setShowDropdown(!showDropdown)} className="hover:opacity-70 transition-opacity">
                    <MoreVertical className="size-6 text-slate-200" />
                  </button>

                  {showDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                      <div className="absolute right-0 mt-3 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <button onClick={() => { setActiveTab("settings"); setShowDropdown(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-700 flex items-center gap-3">
                          <Settings className="size-4" /> Settings
                        </button>
                        <button onClick={() => { logout(); setShowDropdown(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-700 text-red-400 flex items-center gap-3 border-t border-slate-700/50">
                          <LogOut className="size-4" /> Log out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. DESKTOP SIDEBAR (Hidden on Mobile) */}
          <div className="hidden md:flex w-24 bg-slate-900/80 backdrop-blur-sm flex-col items-center py-6 border-r border-slate-700/50 gap-8">
            <div className="flex flex-col items-center gap-6">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setActiveTab(item.key); setSettingsSubView("main"); }}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all ${activeTab === item.key ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-slate-800/50 border-slate-700/70 hover:bg-slate-700/60 text-slate-400'}`}
                >
                  <item.icon className="size-6" />
                </button>
              ))}
            </div>
            <div className="flex-1 flex items-end pb-6">
              <button onClick={() => { setActiveTab("settings"); setSettingsSubView("main"); }} className={`rounded-full border-2 transition-all ${activeTab === "settings" ? 'border-cyan-400 p-0.5' : 'border-transparent'}`}>
                <ProfileHeader isVertical />
              </button>
            </div>
          </div>

          {/* 3. MIDDLE COLUMN (Lists & Settings) */}
          <div className={`flex flex-col w-full md:w-80 bg-slate-900/40 border-r border-slate-700/50 ${selectedUser ? "hidden md:flex" : "flex h-full"}`}>
            {activeTab !== "settings" ? (
              <>
                {/* Ask Meta AI / Search Look */}
                <div className="p-4 md:hidden">
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                      <input type="text" placeholder="Ask Meta AI or Search" className="w-full bg-slate-800/80 border-none rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-slate-700" />
                   </div>
                </div>
                <ActiveTabSwitch />
                <div className="flex-1 overflow-y-auto pb-20 md:pb-0"><ChatList /></div>
              </>
            ) : (
              /* Settings View Logic (Profile resides here now) */
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-300">
                {settingsSubView === "main" ? (
                    <div className="p-6">
                      <h1 className="text-2xl font-bold mb-6">Settings</h1>
                      <button onClick={() => setSettingsSubView("edit-profile")} className="w-full flex items-center gap-4 p-3 hover:bg-slate-700/40 rounded-xl transition-colors mb-6 text-left">
                        <div className="size-16 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-lg">
                           <img src={authUser?.profilePic || "/avatar.png"} className="object-cover size-full" alt="Profile" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-lg">{authUser?.fullName}</h2>
                          <p className="text-slate-400 text-xs">Manage your profile</p>
                        </div>
                      </button>
                      <div className="space-y-1">
                        <SettingsItem icon={<User className="size-5" />} label="Account" />
                        <SettingsItem icon={<Shield className="size-5" />} label="Privacy" />
                        <button onClick={() => { mouseClickSound.play().catch(()=>{}); toggleSound(); }} className="w-full flex items-center justify-between p-3 hover:bg-slate-700/40 rounded-xl transition-colors">
                          <div className="flex items-center gap-4 text-slate-300">
                            {isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />}
                            <span className="font-medium text-sm">Sound Effects</span>
                          </div>
                          <div className={`w-8 h-4 rounded-full transition-colors ${isSoundEnabled ? 'bg-cyan-500' : 'bg-slate-600'}`}>
                             <div className={`size-3 bg-white rounded-full mt-0.5 transition-transform ${isSoundEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
                          </div>
                        </button>
                        <button onClick={logout} className="w-full flex items-center gap-4 p-3 text-red-400 hover:bg-red-400/10 rounded-xl mt-4">
                          <LogOut className="size-5" /><span className="font-medium text-sm">Log out</span>
                        </button>
                      </div>
                    </div>
                ) : (
                  /* Edit Profile Sub-view (as per your code) */
                  <div className="flex flex-col h-full bg-slate-900/40">
                     <div className="p-6 flex items-center gap-4 border-b border-slate-700/50">
                        <button onClick={() => setSettingsSubView("main")} className="p-2 hover:bg-slate-800 rounded-full">
                          <ArrowLeft className="size-5" />
                        </button>
                        <h1 className="text-lg font-semibold">Edit Profile</h1>
                     </div>
                     {/* ... (Your existing profile editing UI here) ... */}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. CHAT AREA */}
          <div className={`flex-1 flex flex-col bg-slate-950/20 ${!selectedUser ? "hidden md:flex" : "flex h-full"}`}>
            {activeTab === "chats" ? (selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />) : 
             activeTab === "ai" ? <AIChatContainer /> : 
             <div className="flex-1 flex items-center justify-center opacity-30 italic">Module Loaded...</div>}
          </div>

          {/* 5. REVISED BOTTOM NAV (Mobile Only - No Profile) */}
          {!selectedUser && (
            <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-slate-900/95 border-t border-slate-800 flex justify-around items-center z-50">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.key ? 'text-cyan-400' : 'text-slate-500'}`}
                >
                  <div className={`p-1 px-4 rounded-full ${activeTab === item.key ? 'bg-cyan-500/10' : ''}`}>
                    <item.icon className="size-6" />
                  </div>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          )}

        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

function SettingsItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-4 p-3 text-slate-300 hover:bg-slate-700/30 rounded-xl transition-colors">
      <span className="text-slate-500">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

export default ChatPage;
