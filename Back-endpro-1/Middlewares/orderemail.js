import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


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
export const emailOptions = async (email, status , total ) => {
    const mail_option = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your Order",
    html  : `
        <!DOCTYPE html>
            <html>

            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }

                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        overflow: hidden;
                    }

                    .email-header {
                        background-color: #007BFF;
                        color: #ffffff;
                        text-align: center;
                        padding: 20px;
                    }

                    .email-body {
                        padding: 20px;
                        color: #333333;
                        line-height: 1.6;
                    }

                    .email-footer {
                        background-color: #f4f4f4;
                        color: #666666;
                        text-align: center;
                        padding: 10px;
                        font-size: 14px;
                    }

                    .button {
                        display: inline-block;
                        background-color: #007BFF;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        margin: 0 auto ;
                        margin-top: 20px;
                    }
                    .order , .code {
                        font-size: 2.5rem ;
                        color: #000000;
                        text-transform: capitalize;
                        font-weight: 900 ;
                        display: block;
                        width: 250px;
                        text-align: center;
                    }
                    .status{
                        font-size: 2rem ;
                        font-weight: 800;
                        text-transform: uppercase;
                        color: #007BFF;
                    }
                </style>
            </head>

            <body>
                <div class="email-container">
                    <div class="email-header">
                        <h1>Welcome to Our Service</h1>
                    </div>
                    <div class="email-body">
                        <p>Dear Customer,</p>
                        <p>Thank you for signing up for our service. We're thrilled to have you on board!</p>
                        <h1>Your Order Status is <span class="status"> ${status}</span> </h1>
                        <h3>Total Price Of Your Order After Discount  </h3>
                        
                        <a href="https://example.com" class="button code">${total}</a>
                        <p>If you have any questions or need assistance, feel free to contact us at any time.</p>

                        <a href="https://example.com" class="button">Visit Our Website</a>
                    </div>
                    <div class="email-footer">
                        <p>&copy; 2025 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </body>

            </html>
    `
    };

    try {
        const info = await transporter.sendMail(mail_option);
        console.log(`Email sent successfully to ${email}`);
    } catch (error) {
        console.log(`Fail To sent ${email}`, error);
    }
};