import jwt from "jsonwebtoken";
import { ENV } from "./env.js"

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
        expiresIn: "7d",
    });


    console.log("Setting cookie for user:", userId); // <--- ADD THIS
    console.log("NODE_ENV is:", ENV.NODE_ENV);

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "lax",
        secure: false,
    });

    return token;
};

// http://localhost
// https://dsmakmk.com