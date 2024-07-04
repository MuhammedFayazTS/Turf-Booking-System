import { asyncHandler } from "../utils/asyncHandler.js";

const authorizeRole = (requiredRoles) => {
  return asyncHandler((req, res, next) => {
    if (!req.user || !requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  });
};

export default authorizeRole;
