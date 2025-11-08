import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRouter from './routes/userRoute.js';
import geminiResponse from './gemini.js';

const app=express();  //instance of express application
dotenv.config();  //load environment variables from .env file

const corsOptions ={
  origin: "https://virtualassistant-frontend-gntg.onrender.com", // frontend URL
  credentials: true,                // 🔑 allow cookies/headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // optional but safe
  allowedHeaders: ["Content-Type", "Authorization"],     // allow headers
}
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // form-urlencoded data ke liye


//middleware pre use authentication 
app.use("/api/auth",authRoute)
app.use("/api/user",userRouter)


const PORT =process.env.PORT || 5000;
connect();

app.get("/",async(req,res)=>{
  let command=req.query.command
  let data =await geminiResponse(command)
  res.json  (data)


})
app.listen(PORT,()=>{
          console.log(`Server is running on port ${PORT}`);
})
