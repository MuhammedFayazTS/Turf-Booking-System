import { Router } from "express";
import {
  create,
  list,
  listForOwner,
  turfInputValidation,
} from "../../Controllers/v1/turf.controller.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import authorizeRole from "../../middlewares/authorize.role.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

//secured routes
router
  .route("/create")
  .post(
    verifyJWT,
    authorizeRole(["owner", "admin"]),
    upload.any(),
    attachUserId,
    turfInputValidation,
    create
  );

router.route("/list").get(verifyJWT, list);

router.route("/list-for-owner").get(verifyJWT, listForOwner);

export default router;
