import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import authRoute from './routes/authRoute.js';

const app=express();  //instance of express application
dotenv.config();  //load environment variables from .env file

app.get('/',(req,res)=>{
res.send('Hello from Express server!')

})

//middleware pre use authentication 
app.use("/api/auth",authRoute)
app.use(express.json())
app.use(cookieParser())


const PORT =process.env.PORT || 5000;
connect();
app.listen(PORT,()=>{
          console.log(`Server is running on port ${PORT}`);
})
