const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // ✅ check user exists
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No role found",
        });
      }

      // ✅ check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access denied",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role verification failed",
        error: error.message,
      });
    }
  };
};

module.exports = verifyRoles;