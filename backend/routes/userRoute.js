
import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, updateAssistant } from "../controllers/userController.js";
import upload from "../config/multer.js";

const userRouter=express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logged out successfully" });
});
export default userRouter;