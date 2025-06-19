import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.USERPASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const getMailOptions = (to, randomCode) => ({
  from: {
    name: "E-commerce",
    address: process.env.EMAIL,
  },
  to: [to],
  subject: "Reset Your Password",
  text: "Reset Your Password",
  html: `
    <html>
      <body>
        <h2>Your Code is:</h2>
        <div style="font-size: 2rem; font-weight: bold;">${randomCode}</div>
      </body>
    </html>
  `,
});


export const sendMail = async (transporter, mailOption) => {
  try {
    console.log(" Trying to send email...");
    await transporter.sendMail(mailOption);
    console.log(" Email sent!");
  } catch (error) {
    console.error(" Email error:", error.message);
    throw error;
  }
};