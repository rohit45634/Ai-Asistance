import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRouter from './routes/userRoute.js';

const app=express();  //instance of express application
dotenv.config();  //load environment variables from .env file




app.use(express.urlencoded({ extended: true })); // form-urlencoded data ke liye
app.use(express.json())


const corsOptions ={
  origin: "http://localhost:3000", // frontend URL
  credentials: true                // 🔑 allow cookies/headers
}
app.use(cors(corsOptions));

app.use(cookieParser())

//middleware pre use authentication 
app.use("/api/auth",authRoute)
app.use("/api/user",userRouter)


const PORT =process.env.PORT || 5000;
connect();
app.listen(PORT,()=>{
          console.log(`Server is running on port ${PORT}`);
})
