import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";
import authorizeRole from "../../middlewares/authorize.role.middleware.js";

const router = Router();

// import controllers
import { adminApproveController, adminRejectController } from "../../Controllers/v1/admin.controller.js";

//secured routes
//approve route
router
  .route("/:type/:id/approve/:role?")
  .put(
    verifyJWT,
    authorizeRole(["admin"]),
    attachUserId,
    adminApproveController
  );

//reject route
router
  .route("/:type/:id/reject/:role?")
  .put(
    verifyJWT,
    authorizeRole(["admin"]),
    attachUserId,
    adminRejectController
  );

export default router;
