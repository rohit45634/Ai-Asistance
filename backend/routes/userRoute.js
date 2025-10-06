
import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controllers/userController.js";

const userRouter=express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
export default userRouter;