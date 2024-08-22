import jwt from "jsonwebtoken"


// {
//      headers: {
//           authorization: "Bearer sadjasldjasldjlaskdj"
//      }
// }

export const verifyToken = (req, res, next) => {
     const authHeader = req.headers["authorization"]
     const token = authHeader && authHeader.split(" ")[1]
     if(token == null) return res.status(401).json("شما باید ابتدا وارد حساب کاربری خود شوید");
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
         if(err) return res.status(403).json("توکن منقضی شده است")
         req.userId = decoded.userId
         next(); 
     })
}