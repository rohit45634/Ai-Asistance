import genToken from "../config/token.js"
import User from "../models/userSchema.js"
import bcrypt from "bcryptjs";


export const signUp =async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    const token = genToken(user._id) //generate token
    res.cookie("token",token,{
          httpOnly:true,maxAge:7*24*60*60*1000,
          

})

    return res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
}


//Login Controller 
export const Login =async(req,res)=>{
            try{
               const {email,password}=req.body
      console.log("Email:", email, "Password:", password);

         // !validation 
          if(!email||!password){
                    return res.json({message:"Please Enter All field Require"})

          }

//check email already exist or not?
    const user=await User.findOne({email})
    if(!user){
          return res.status(400).json({message :"Email doesnot Exists"})
    }

//compare password 
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
return res.status(400).json({message:"Incorrect Password"})

          
}

const token= genToken(user._id)
res.cookie("token",token,{
          httpOnly:true,maxAge:7*24*60*60*1000,
           secure: false, // true if using HTTPS
  sameSite: "lax",
})
console.log("Setting token cookie:", token);

return res.status(200).json({message:"login successfully",user,token})
}catch(error){
console.log(error)}
}
   
export const logOut=async(req,res)=>{
try{
          res.clearcookie("token")
        return  res.status(200).json({message:`Logout Successfully`})  

}catch(error){
return res.status(500).json({message:`Logout Error ${error}`})  }
}

