import express from "express";
import { Register, Login, Logout } from "../controllers/user.controller.js";
import { forgetPassword, resetPassword, changeForgetPassword } from "../controllers/user.controller.js";
import { loginverify, registerverify } from "../Middlewares/auth.validation.js";
import { authentication } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerverify, Register); 
router.post("/login", loginverify, Login);
router.post("/logout", authentication, Logout);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', changeForgetPassword);

export default router;
