import nodemailer from "nodemailer";

const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // App password (not normal Gmail password)
  },
});

export const sendGmailMail = async (to: string, subject: string, html: string) => {
  const platformName = process.env.PLATFORM_NAME || "SHOPXET";

  await gmailTransporter.sendMail({
    from: `"${platformName} Security" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
