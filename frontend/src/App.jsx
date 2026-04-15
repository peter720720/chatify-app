// import { Navigate, Route, Routes } from "react-router";
// import ChatPage from "./pages/ChatPage";
// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
// import { useAuthStore } from "./store/useAuthStore";
// import { useEffect } from "react";
// import PageLoader from "./components/PageLoader";

// import { Toaster } from "react-hot-toast";

// function App() {
//   const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   console.log({ authUser });

//   if (isCheckingAuth && !authUser) return <PageLoader />

//   return (
//     <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

//       {/* DECORATORS - GRID BG & GLOW SHAPES */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,
//       transparent_1px), linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"/>
//       <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
//       <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />



//       <Routes>
//         <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
//         <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
//         <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
//         <Route path="/forgot-password" element={!authUser ? <ForgotPasswordPage /> : <Navigate to={"/"} />} />
//         <Route path="/reset-password/:token?" element={<ResetPasswordPage />} />      </Routes>

//       <Toaster />
//     </div>
//   )
// }

// export default App;

import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return <PageLoader />;

  return (
    // Changed: Removed p-4, items-center, justify-center to allow full screen
    <div className="h-screen w-full bg-slate-950 relative overflow-x-hidden">

      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      {/* Added: pointer-events-none so you can click "through" the background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-10 blur-[100px] pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 h-full w-full">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
          <Route path="/forgot-password" element={!authUser ? <ForgotPasswordPage /> : <Navigate to={"/"} />} />
          <Route path="/reset-password/:token?" element={<ResetPasswordPage />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
