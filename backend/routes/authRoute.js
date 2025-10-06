import express, { Router } from "express";
import { Login, logOut } from "../controllers/auth.js";

const authRoute= express.Router() 

authRoute.post("/Login",Login)
authRoute.get("/Logout",logOut)


export default authRoute;