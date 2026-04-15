import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { ENV } from "../lib/env.js";

export const arcjetProtection = async (req, res, next) => {
    try {
        if (ENV.NODE_ENV === "development") {
            return next();
        }

        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ message: "Too many requests. Please try again later." });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Access denied. Bot traffic is not allowed." });
            } else {
                return res.status(403).json({
                    message: "Access denied by security policy.",
                });
            }
        }

        // check for spoofed bots
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ 
                error: "Spoofed Bot Detected",
               message: "Malicious bot activity detected.",
         });
        }

        next();
    } catch (error) {
        console.error("Arcjet Protection Error:", error);
        next();
    }
}; 