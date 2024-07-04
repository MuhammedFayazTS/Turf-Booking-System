import { Router } from "express";
import { create, createTurfInputValidation } from "../../Controllers/v1/turf.controller.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import authorizeRole from "../../middlewares/authorize.role.middleware.js";

const router = Router();

//secured routes
router
  .route("/create")
  .post(verifyJWT, authorizeRole(["owner","user"]),createTurfInputValidation,attachUserId, create);

export default router;
