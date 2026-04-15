import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate, createPasswordResetEmailTemplate } from "../emails/emailTemplates.js";

// Ensure 'export' is right before the function
export const sendWelcomeEmail = async (email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from:"Chatify <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailTemplate(name,clientURL)
    });

    if (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email")
    }

    console.log("Welcome Email sent sucessfully", data);
};

export const sendPasswordResetEmail = async (email, name, otp, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from:"Chatify <onboarding@resend.dev>",
        to: email,
        subject: "Reset Your Password - Chatify",
        html: createPasswordResetEmailTemplate(name, otp, clientURL)
    });

    if (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email")
    }

    console.log("Password reset email sent successfully", data);
};
