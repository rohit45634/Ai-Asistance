import genToken from "../config/token.js"
import User from "../models/userSchema.js"

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

const token=await genToken(user._id)
res.cookie("token",token,{
          httpOnly:true,maxAge:7*24*60*60*1000,
          

})
return res.status(200).json({message:"login successfully",user})
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

