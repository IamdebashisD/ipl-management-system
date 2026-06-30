import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `${process.env.SMTP_FROM_EMAIL}`,
        to,
        subject,
        html
    })
}
const sendVerificationEmail = async (email, token) => {
    const url = `http://localhost:3000/verify-email?token=${token}`
    const subject = "Verify your email"

    const html = `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${url}">Verify Email</a>
    `

    await sendEmail(email, subject, html)
}

const sendResetPasswordEmail = async (email, token) => {
    const url = `http://localhost:3000/reset-password?token=${token}`
    const subject = "Reset your password"

    const html = `
        <h2>Password Reset</h2>
        <p>You requested to reset your password.</p>
        <p>Click the link below to reset it (valid for 25 minutes):</p>
        <a href="${url}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
    `
    await sendEmail(email, subject, html)
}

export {
    sendEmail,
    sendVerificationEmail,
    sendResetPasswordEmail
}










// try {
//   const info = await transporter.sendMail({
//     from: '"Example Team" <team@example.com>', // sender address
//     to: "alice@example.com, bob@example.com", // list of recipients
//     subject: "Hello", // subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Preview URL is only available when using an Ethereal test account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// } catch (err) {
//   console.error("Error while sending mail:", err);
// }