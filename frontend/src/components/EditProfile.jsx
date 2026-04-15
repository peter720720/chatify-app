import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from "../store/useAuthStore";
import { 
  X, Camera, Image as ImageIcon, RotateCw, 
  Trash2, Bolt, BoltOff, Check, Play 
} from "lucide-react";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { authUser, updateProfile } = useAuthStore();
  
  // Camera & Logic States
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState('photo'); // 'photo' or 'video'
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState("00:00");
  const [facingMode, setFacingMode] = useState('user');
  const [isFlashOn, setIsFlashOn] = useState(false);

  // Refs for Media Handling
  const videoRef = useRef(null);
  const filePickerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const timerRef = useRef(null);

  // --- 1. Start/Stop Camera ---
  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: mode === 'video'
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      toast.error("Camera access denied");
      setShowCamera(false);
    }
  };

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    stopTimer();
    setIsRecording(false);
    setShowCamera(false);
  };

  // --- 2. Photo & Video Logic ---
  const handleCapture = () => {
    if (mode === 'photo') {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      const data = canvas.toDataURL("image/jpeg");
      updateProfile({ profilePic: data }); // Save as profile pic
      closeCamera();
    } else {
      isRecording ? stopRecording() : startRecording();
    }
  };

  const startRecording = () => {
    recordedChunks.current = [];
    const stream = videoRef.current.srcObject;
    const mr = new MediaRecorder(stream, { mimeType: 'video/webm' });
    
    mr.ondataavailable = (e) => { if (e.data.size > 0) recordedChunks.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      console.log("Video URL:", url); // You can save this to your gallery
    };

    mr.start();
    mediaRecorderRef.current = mr;
    setIsRecording(true);
    startTimer();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setIsRecording(false);
    stopTimer();
  };

  // --- 3. Timer Helper ---
  const startTimer = () => {
    let s = 0;
    timerRef.current = setInterval(() => {
      s++;
      const mm = String(Math.floor(s / 60)).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      setTimer(`${mm}:${ss}`);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimer("00:00");
  };

  return (
    <div className="h-full flex flex-col bg-[#111b21] items-center py-10">
      
      {/* 🚀 PROFILE PREVIEW (Square - No border-radius) */}
      {!showCamera && (
        <div className="relative">
          <div className="size-52 border-2 border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl">
            <img 
              src={authUser?.profilePic || "/avatar.png"} 
              className="size-full object-cover" 
              alt="Profile"
            />
          </div>
          <button 
            onClick={openCamera}
            className="absolute -bottom-4 right-4 p-4 bg-[#00a884] text-white shadow-lg active:scale-90 transition-transform"
          >
            <Camera size={24} />
          </button>
        </div>
      )}

      {/* 🚀 FULL-SCREEN CAMERA UI (Matches Mobile Screenshot) */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
          
          {/* Top Bar */}
          <div className="p-6 flex justify-between items-center text-white">
            <X className="size-8 cursor-pointer" onClick={closeCamera} />
            {isRecording && (
              <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                <div className="size-2 bg-white rounded-full" /> {timer}
              </div>
            )}
            <button onClick={() => setIsFlashOn(!isFlashOn)}>
              {isFlashOn ? <Bolt className="text-yellow-400" /> : <BoltOff className="opacity-50" />}
            </button>
          </div>

          {/* Viewfinder (Square) */}
          <div className="flex-1 flex items-center justify-center bg-zinc-900 overflow-hidden">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-auto object-cover" 
            />
          </div>

          {/* Bottom Bar: Shutter & Controls */}
          <div className="p-10 bg-black flex flex-col items-center gap-8">
            <div className="flex justify-between items-center w-full max-w-sm px-6">
              
              {/* Gallery Trigger */}
              <button 
                onClick={() => filePickerRef.current.click()}
                className="p-3 bg-zinc-800/50 rounded-xl text-white"
              >
                <ImageIcon size={28} />
              </button>

              {/* 🚀 NATIVE SHUTTER BUTTON */}
              <button 
                onClick={handleCapture}
                className="size-24 rounded-full border-[6px] border-white flex items-center justify-center p-1 active:scale-95 transition-transform"
              >
                <div className={`size-full rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500 scale-75' : 'bg-white'}`} />
              </button>

              {/* Flip Camera */}
              <button 
                onClick={() => setFacingMode(f => f === 'user' ? 'environment' : 'user')}
                className="p-3 bg-zinc-800/50 rounded-xl text-white"
              >
                <RotateCw size={28} />
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-white">
              <button 
                onClick={() => setMode('video')} 
                className={mode === 'video' ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1' : 'opacity-40'}
              >
                Video
              </button>
              <button 
                onClick={() => setMode('photo')} 
                className={mode === 'photo' ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1' : 'opacity-40'}
              >
                Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Picker */}
      <input 
        type="file" 
        ref={filePickerRef} 
        className="hidden" 
        accept="image/*,video/*"
        onChange={(e) => {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            updateProfile({ profilePic: reader.result });
            setShowCamera(false);
          };
        }}
      />
    </div>
  );
};

export default EditProfile;
