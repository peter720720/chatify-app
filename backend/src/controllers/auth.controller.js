import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from '../lib/utils.js'
import { sendWelcomeEmail, sendPasswordResetEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js"
import cloudinary from "../lib/cloudinary.js";
import jwt from "jsonwebtoken";

// Helper function to get default avatar based on gender
const getDefaultAvatar = (gender) => {
    if (gender === "female") {
        return "/female-avatar.png";
    }
    return "/avatar-profile-picture-man.png";
};


// export const signup = async (req, res) => {
//     const { fullName, email, password } = req.body

//     try {
//         if (!fullName || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         if (password.length < 6) {
//             return res.status(400).json({ message: "Password must be at least 6 characters" });
//         }

//         // check if emails is valid: regex
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ message: "Invalid email format" })
//         }

//         const user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: "Email already exists" })

//         // 123456 => $dnjasdkasj_?dmsakmk
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new User({
//             fullName,
//             email,
//             password: hashedPassword
//         })

//         // Persist user first, then issue auth cookie
//         const savedUser = await newUser.save();
//         // generateToken(savedUser._id, res);

//         res.status(201).json({
//             message: "User created! Please log in.",
//         });

//         res.status(201).json({
//             message: "User signup successfully",
//             _id: savedUser._id,
//             fullName: savedUser.fullName,
//             email: savedUser.email,
//             profilePic: savedUser.profilePic
//         });

//         // Send welcome email asynchronously (don't block response)
//         try {
//             await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
//         } catch (error) {
//             console.log("Failed to send welcome email:", error);
//         }
//     } catch (error) {
//         console.log("Error in signup controller:", error);
//         res.status(500).json({ message: "Internal server error" })
//     }

//     // res.send("Signup endpoint");
// };

export const signup = async (req, res) => {
    const { fullName, email, password, gender } = req.body;

    try {
        if (!fullName || !email || !password || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (gender !== "male" && gender !== "female") {
            return res.status(400).json({ message: "Gender must be male or female" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            gender,
            password: hashedPassword,
            profilePic: getDefaultAvatar(gender)
        });

        const savedUser = await newUser.save();


        res.status(201).json({
            message: "Account created successfully! Please log in.",
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email
        });

        try {
            await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
        } catch (error) {
            console.log("Failed to send welcome email:", error);
        }
        
    } catch (error) {
        console.log("Error in signup controller:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        // never tell the client which one is incorrect: password or email

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        generateToken(user._id, res)

        res.status(200).json({
            message: "Login successfully",
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal sever error" });
    }
};


// export const logout = async (req, res) => {
//     try {
//         // Clear the cookie named 'jwt'
//         res.cookie("jwt", "", {
//             maxAge: 0, // Destroys the cookie instantly
//             httpOnly: true,
//             sameSite: "lax",
//             path: "/",
//             secure: process.env.NODE_ENV !== "development",
//         });
        
//         res.status(200).json({ message: "Logged out successfully" });
//     } catch (error) {
//         console.log("Error in logout controller:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax",
            path: "/",           // MUST match the path in your DevTools
            expires: new Date(0) // Force immediate expiration
        });
        
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Backend Controller (Example)
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body; // Ensure you destructure BOTH
    const userId = req.user._id;

    const updateData = {};
    if (profilePic) updateData.profilePic = profilePic;
    if (fullName) updateData.fullName = fullName;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No data provided to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in checkAuth:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if email exists or not for security
            return res.status(200).json({ message: "If an account with this email exists, a password reset link has been sent." });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in user document with expiration (10 minutes)
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // Send password reset email
        try {
            await sendPasswordResetEmail(user.email, user.fullName, otp, ENV.CLIENT_URL);
        } catch (emailError) {
            console.log("Failed to send password reset email:", emailError);
            // Don't fail the request if email fails, but log it
        }

        res.status(200).json({ message: "If an account with this email exists, a password reset link has been sent." });

    } catch (error) {
        console.log("Error in forgotPassword controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
  res.status(200).json({ message: "Reset password endpoint working!" });
};
