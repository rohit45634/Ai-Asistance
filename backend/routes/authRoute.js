import express, { Router } from "express";
import { Login, logOut, signUp } from "../controllers/auth.js";

const authRoute= express.Router() 
authRoute.post("/register",signUp)

authRoute.post("/Login",Login)
authRoute.get("/Logout",logOut)


export default authRoute;