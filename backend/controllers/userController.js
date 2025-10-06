import User from "../models/userSchema.js"
export const getCurrentUser=async()=>{
          try {
                    const userId =req.userId
                    const user=await User.findById(userId).select("-password")
                    if(!user){
                              return res.status(400).json({message:"user not found"})
                    }
                    return res.status(200).json(user)

          } catch (error) {
          return res.status(400).json({message:"get currentuser error"})

                    
          }

}