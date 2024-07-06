import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";
import authorizeRole from "../../middlewares/authorize.role.middleware.js";

const router = Router();

// import controllers
import { adminApproveController } from "../../Controllers/v1/admin.controller.js";

//secured routes
router
  .route("/:type/:userId/:role")
  .put(
    verifyJWT,
    authorizeRole(["admin"]),
    attachUserId,
    adminApproveController
  );

export default router;
