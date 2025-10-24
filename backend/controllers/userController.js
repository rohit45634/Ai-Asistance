import uploadCloudinary from "../config/cloudinary.js"
import User from "../models/userSchema.js"


export const getCurrentUser=async(req,res)=>{
          try {
                    const userId =req.userId
                    console.log("User ID:", userId); // 👈 ADD THIS LINE HERE

                    const user=await User.findById(userId).select("-password")
                    if(!user){
                              return res.status(400).json({message:"user not found"})
                    }
                    return res.status(200).json(user)

          } catch (error) {
          return res.status(400).json({message:"get currentuser error"})

                    
          }

}
export const updateAssistant=async(req,res)=>{
          try {
                    const {assistantName,imageUrl}=req.body
                    let assistantImage;
          if(req.file){
                    assistantImage=await uploadCloudinary(req.file.path)
          }else{
                    assistantImage=imageUrl
          }
const user=await User.findByIdAndUpdate(req.userId,{
          assistantName,assistantImage
},{new:true}).select("-password")
return res.status(200).json({user})


} catch (error) {
          res.status(400).json({message:"update assitant error"})
}
}

