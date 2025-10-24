import jwt from "jsonwebtoken"
const isAuth =async(req,res,next)=>{
          try {
                    const token=await req.cookies.token  //fetch token from cookie
                        console.log("Received token:", token); // 👈 check what token looks like

                    if(!token){
                              return res.status(400).json({message:"token not found"})
                    }
                    const verifyToken=  jwt.verify(token,process.env.JWT_SECRET)  //verify token  using jwt 
                        console.log("veifytoken JWT:", verifyToken); // 👈 see what's inside

          req.userId=verifyToken.id;     //give userId to req.userId
               console.log("Cookies:", req.cookies);
console.log("Token:", req.cookies?.token);
          next()
     

                    
          } catch (error) {
                    console.log(error)
                    return res.status(400).json({message:"is Auth error"})
                    
          }

}

export default isAuth;