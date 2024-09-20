const User = require("./models/UserModel");
const jwt = require("jsonwebtoken");

async function isLoggedIn(req, res) {
  try {
    // Retrieve the JWT secret key securely
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    // Retrieve the token from cookies
    const token = req.cookies["user"];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "No token provided",
      });
    }

    let decoded;
    try {
      // Verify the JWT token
      decoded = jwt.verify(token, JWT_SECRET_KEY);
    } catch (e) {
      console.error("JWT Verification Error:", e.message);
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid or expired token",
      });
    }

    console.log("Decoded:", decoded);

    let user;
    try {
      // Find the user by ID from the decoded token
      user = await User.findOne({ _id: decoded.data._id });
      console.log("User:", user);
    } catch (e) {
      console.error("Database Error:", e.message);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Database error",
      });
    }

    // Respond accordingly based on user existence
    if (user) {
      res.json({
        success: true,
        error: false,
        body: user,
        message: "User is logged in",
      });
    } else {
      res.status(401).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }
  } catch (error) {
    // Catch any top-level errors
    console.error("isLoggedIn Error:", error.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
}

module.exports = isLoggedIn;
