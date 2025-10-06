import jwt from "jsonwebtoken"
const isAuth =async(req,res,next)=>{
          try {
                    const token=await req.cookies.token  //fetch token from cookie
                    if(!token){
                              return res.status(400).json({message:"token not found"})
                    }
                    const verifyToken= await jwt.verify(token,process.env.JWT_SECRET)  //verify token  using jwt 
          req.userId=verifyToken.userId     //give userId to req.userId
                    
          } catch (error) {
                    console.log(error)
                    return res.status(400).json({message:"is Auth error"})
                    
          }

}

export default isAuth;