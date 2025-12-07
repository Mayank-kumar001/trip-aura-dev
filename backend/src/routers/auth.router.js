import express from "express"
import { checkAuth, forgotPassword, getUserData, loginUser, logoutUser, registerUser, resendVerificationCode, resetPassword, UserExist, verifyUser } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post("/register", registerUser)
authRouter.get("/checkUser/:email", UserExist)
authRouter.get("/checkAuth/",isLoggedIn, checkAuth)
authRouter.post("/email-verify", verifyUser)
authRouter.post("/resend-verification-code", resendVerificationCode)
authRouter.post("/login", loginUser)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)
authRouter.get("/logout", isLoggedIn, logoutUser)
authRouter.get("/me", isLoggedIn, getUserData)

