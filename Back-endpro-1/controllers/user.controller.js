import User from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  getMailOptions,
  generateRandomCode,
  sendMail,
  transporter,
} from "../Middlewares/email.js";

export const Register = async (req, res) => {
  try {
    const user = req.body;
    const duplicatedemail = await User.findOne({ email: user.email });

    if (duplicatedemail) {
      return res.status(400).json({ status: "Fail", data: "Email already exists" });
    }

    user.createdAt = new Date().toString();
    const newUser = new User(user);
    await newUser.save();

    res.status(201).json({ status: "Success", data: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ status: "Fail", message: "Internal Server Error", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "Fail", data: "You must send Email and Password" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ status: "Fail", data: "Email or Password is not correct" });
    }
    req.session._id = user._id;

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: "1h" });

    user.tokens.push(token);
    await user.save();

    res.status(200).json({
      status: "Success",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Fail", data: "Internal Server Error" });
  }
};

export const forgetPassword = async (req, res) => {
  console.log("forgetPassword called");

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ status: "fail", data: "No User With This Email" });
  }

  req.session._id = user._id;

  const resetcode = generateRandomCode();
  console.log("Generated Reset Code:", resetcode);

  user.resetCode = resetcode;
  await user.save();

  const mailOption = getMailOptions(email, resetcode);
  console.log(" Sending email to:", email);

  try {
    await sendMail(transporter, mailOption); 
    return res.status(200).json({ status: "success", data: "Reset Code Sent To Your Email." });
  } catch (error) {
    console.error(" Failed to send email:", error.message);
    return res.status(500).json({
      status: "fail",
      data: "Failed to send reset code. Try again later.",
    });
  }
};


export const resetPassword = async (req, res) => {
  const { resetPasswordCode } = req.body;
  const userId = req.session?._id;

  const user = await User.findById(userId);

  if (!user || resetPasswordCode !== user.resetCode) {
    return res.status(400).json({ status: "fail", data: "Code to reset password doesn't match" });
  }

  res.status(200).json({ status: "success", data: "Code To Reset Password Has Matched" });
};

export const changeForgetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const userId = req.session?._id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ status: "Fail", data: "This User Not Found" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ status: "fail", data: "Passwords Not Match" });
  }

  user.password = newPassword;
  user.resetCode = undefined;
  await user.save();

  req.session.destroy();
  res.status(200).json({ status: "success", data: "Password Has Been Updated Successfully" });
};

export const Logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: "Fail", data: "Token required for logout" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ status: "Fail", data: "User not found" });
    }

   
    user.tokens = user.tokens.filter(t => t !== token);
    await user.save();


    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          console.log("Session destroy error:", err);
        }
      });
    }

    res.status(200).json({ status: "Success", data: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ status: "Fail", data: "Internal Server Error" });
  }
};
