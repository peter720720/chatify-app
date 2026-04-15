export function createWelcomeEmailTemplate(name, clientURL) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Chatify Messenger</title>
    <head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;
    padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(to right, #5886E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <img src="https://img.freepik.com/free-vector/hand-drawn-messenge-element-vector-cute-sticker 53876-118344.jpg?
        t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bcBd34136cd6d64749455fBcd5f29a924281bafc11b96c$w=1480"
        alt="Messenger Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: #fff; padding: 10px;">
        <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 500;">Welcome to Messenger!</h1>
    </div>
    <div style="background-color: #fff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);">
        <p style="font-size: 18px; color: #5886E5;">
            <strong>Hello ${name},</strong>
        </p>
            <p>We're excited to have you join our messaging platform! Messenger connects you with friends, family, and colleagues in real-time, no matter where they are.</p>

        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #36D1DC;">
            <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>Get started in just a few steps:</strong></p>
            <ul style="padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 10px;">Set up your profile picture.</li>
                <li style="margin-bottom: 10px;">Find and add your contacts.</li>
                <li style="margin-bottom: 10px;">Start chatting and sharing moments!</li>
                <li style="margin-bottom: 0;">Share photos, videos, and more.</li>
            </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${clientURL}" style="background: linear-gradient(to right, #36D1DC, #5886E5); color: #fff; padding: 12px 30px; border-radius: 50px;
               text-decoration: none; font-weight: 500; display: inline-block;">Open Messenger
            </a>
        </div>

        <p style="margin-bottom: 5px;">If you need anyhelp or have questions, we're always here to assist you.</p>
        <p style="margin-top: 0;">Happy messaging!</p>

        <p style="margin-top: 25px; margin-bottom: 0;">Best regards,<br>The Messenger Team</p>
    </div>

    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p> 2026 Messenger. All rights reserved.</p>

        <p>
            <a href="#" style="color: #5886E5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
            <a href="#" style="color: #5886E5; text-decoration: none; margin: 0 10px;">Terms of Service</a>
            <a href="#" style="color: #5886E5; text-decoration: none; margin: 0 10px;">Contact Us</a>
        </p>
    </div>
    </body>
    </html>
    `;
}

export function createPasswordResetEmailTemplate(name, otp, clientURL) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - Chatify</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;
    padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(to right, #5886E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <img src="https://img.freepik.com/free-vector/hand-drawn-messenge-element-vector-cute-sticker 53876-118344.jpg?
        t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bcBd34136cd6d64749455fBcd5f29a924281bafc11b96c$w=1480"
        alt="Chatify Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: #fff; padding: 10px;">
        <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 500;">Reset Your Password</h1>
    </div>
    <div style="background-color: #fff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);">
        <p style="font-size: 18px; color: #5886E5;">
            <strong>Hello ${name},</strong>
        </p>
        <p>We received a request to reset your password for your Chatify account. Use the verification code below to reset your password:</p>

        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #36D1DC; text-align: center;">
            <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>Your Verification Code:</strong></p>
            <div style="font-size: 32px; font-weight: bold; color: #5886E5; letter-spacing: 5px; background-color: #e9ecef; padding: 15px; border-radius: 8px; display: inline-block;">
                ${otp}
            </div>
            <p style="font-size: 14px; color: #666; margin: 15px 0 0 0;">This code will expire in 10 minutes.</p>
        </div>

        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
                <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account remains secure.
            </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${clientURL}/reset-password" style="background: linear-gradient(to right, #36D1DC, #5886E5); color: #fff; padding: 12px 30px; border-radius: 50px;
               text-decoration: none; font-weight: 500; display: inline-block;">Reset Password
            </a>
        </div>

        <p style="margin-bottom: 5px;">If you have any questions or need help, please contact our support team.</p>

        <p style="margin-top: 25px; margin-bottom: 0;">Best regards,<br>The Chatify Team</p>
    </div>

    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p>© 2026 Chatify. All rights reserved.</p>
        <p>
            <a href="#" style="color: #5886E5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
            <a href="#" style="color: #5886E5; text-decoration: none; margin: 0 10px;">Terms of Service</a>
            <a href="#" style="color: #5886E5; text-decoration: none; margin: 0 10px;">Contact Us</a>
        </p>
    </div>
    </body>
    </html>
    `;
}