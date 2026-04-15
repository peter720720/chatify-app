import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon, Eye, EyeOff } from "lucide-react";

function SignUpPage() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "male"
  });

  const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

  const { signup, isSigningUp } = useAuthStore()

 const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) navigate("/login"); 
  }


  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email Address</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        type={showPassword ? "text" : "password"} 
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input input-bordered w-full pl-10 pr-10" 
                        placeholder="Enter your password"
                      />
                      
                      <button
                        type="button" 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500 transition-colors"
                        onClick={() => setShowPassword(!showPassword)} 
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" /> 
                        ) : (
                          <Eye className="size-5" /> 
                        )}
                      </button>
                    </div>
                  </div>

                  {/* GENDER SELECTOR */}
                  <div>
                    <label className="auth-input-label">Gender</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="radio checked:bg-cyan-500"
                        />
                        <span className="text-slate-300">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="radio checked:bg-pink-500"
                        />
                        <span className="text-slate-300">Female</span>
                      </label>
                    </div>
                  </div>

                  {/* Add other inputs like Email/Password here before the </form> tag */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSigningUp}>

                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : ("Create Account")}

                  </button>

                  <div className="text-center mt-6">
                    <p className="text-slate-400">
                      Already have an account?{" "}
                      <Link to="/login" className="text-cyan-500 hover:underline">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            {/* You can add the RIGHT SIDE column here if needed */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img src="/signup.png" alt="People using mobile devices"
                  className="max-w-xs h-auto object-contain mx-auto -mt-8" />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400 mb-2">Connect with friends and family</h3>

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
export default SignUpPage;
