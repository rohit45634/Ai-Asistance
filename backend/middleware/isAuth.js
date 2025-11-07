import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; //fetch token from cookie

    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET); //verify token  using jwt

    req.userId = verifyToken.id; //give userId to req.userId

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(400).json({ message: "is Auth error" });
  }
};

export default isAuth;
