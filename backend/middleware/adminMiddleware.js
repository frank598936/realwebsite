const jwt = require("jsonwebtoken");

const supabase = require("../config/supabase");

async function adminMiddleware(req, res, next) {
  try {
    // Get token from header

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Format: Bearer token

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // Verify token

    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    // Find user

    const { data: user, error } = await supabase

      .from("users")

      .select("id,role")

      .eq("id", decoded.id)

      .single();

    if (error || !user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check admin role

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    // Save user info for next routes

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = adminMiddleware;
