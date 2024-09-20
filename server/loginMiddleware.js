const jwt=require('jsonwebtoken')
const User=require('./models/UserModel')

async function loginMiddlewaare(req,res,next){
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = req.cookies["user"];
    console.log(token,'token from cookie')
    let decoded;
    try {
      decoded = await jwt.verify(token, JWT_SECRET_KEY);
    } catch (e) {
      console.error("JWT Verification Error:", e.message); 
      return res.json({
        success: "false",
        error: "true",
        body: "Invalid or expired token",
      });
    }

    console.log("decode:", decoded.data.email); // Log the error message
    let user;
    try {
      user = await User.findOne({ email: decoded.data.email })
      console.log(" user:", user); // Log the error message
    } catch (e) {
      console.error("Database Error:", e.message); // Log the error message
      return res.json({
        success: "false",
        error: "true",
        body: "Database error",
      });
    }

    // Respond accordingly based on user existence
    if (user) {
      req.user=user;
      req.loginStatus=true;
      next();
    } else {
      res.json({
        success: "false",
        error: "true",
        body: "User not found",
        message: "USER IS NOT LOGGED IN",
      });
    }
  
}
module.exports=loginMiddlewaare