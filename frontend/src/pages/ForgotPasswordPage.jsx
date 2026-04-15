import { useState } from "react";
import { Link } from "react-router-dom";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, LoaderIcon, CheckCircleIcon } from "lucide-react";
import { axiosInstance as axios } from "../lib/axios";
import toast from "react-hot-toast";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      setIsSuccess(true);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  {isSuccess ? (
                    <CheckCircleIcon className="w-12 h-12 mx-auto text-green-400 mb-4" />
                  ) : (
                    <LockIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  )}
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    {isSuccess ? "Check Your Email" : "Reset Your Password"}
                  </h2>
                  <p className="text-slate-400">
                    {isSuccess
                      ? "We've sent a password reset link to your email address."
                      : "Enter your account email and we'll send reset instructions."
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="auth-input-label">Email Address</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full pl-10"
                        placeholder="Enter your email address"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <button className="auth-btn" type="submit" disabled={isSubmitting || !email}>
                    {isSubmitting ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-slate-400">
                      Remembered your password?{" "}
                      <Link to="/login" className="text-cyan-500 hover:underline">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/sign in.png"
                  alt="People using mobile devices"
                  className="max-w-sm w-full h-auto object-contain mx-auto"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400 mb-2">
                    Secure account recovery
                  </h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-bodge">Fast</span>
                    <span className="auth-bodge">Safe</span>
                    <span className="auth-bodge">Reliable</span>
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

export default ForgotPasswordPage;
