import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, isResettingPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    const success = await resetPassword(token, password);
    if (success) navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700">
        <div className="text-center mb-8">
          <div className="bg-blue-500/10 size-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="size-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">New Password</h1>
          <p className="text-slate-400">Please enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Confirm Password</label>
            <input
              type="password"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isResettingPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isResettingPassword ? (
              <Loader2 className="size-5 animate-spin" />
            ) : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
