import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LockIcon, LoaderIcon, Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      {/* 1. RESTORED: Scaled back up to max-w-6xl with matching pixel heights */}
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          {/* 2. RESTORED: Flex-row split screen layout */}
          <div className="w-full flex flex-col md:flex-row">

            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Login to your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email Address</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input input-bordered w-full pl-10"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type={showPassword ? "text" : "password"} /* Changes type dynamically */
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input input-bordered w-full pl-10 pr-10" /* Added pr-10 to make room for the right-side icon */
                        placeholder="Enter your password"
                      />

                      {/* TOGGLE BUTTON */}
                      <button
                        type="button" /* Prevents triggering accidental form submission */
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500 transition-colors"
                        onClick={() => setShowPassword(!showPassword)} /* Flips true/false */
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" /> /* Icon when password is visible */
                        ) : (
                          <Eye className="size-5" /> /* Icon when password is hidden */
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-cyan-500 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Log In"
                    )}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-slate-400">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-cyan-500 hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* DECORATOR COLUMN - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/sign in.png"
                  alt="People using mobile devices"
                  className="max-w-sm w-full h-auto object-contain mx-auto"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400 mb-2">
                    Connect anytime, anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-bodge">Free</span>
                    <span className="auth-bodge">Easy Setup</span>
                    <span className="auth-bodge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
