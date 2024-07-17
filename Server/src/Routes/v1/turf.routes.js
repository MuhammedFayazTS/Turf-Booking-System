import { Router } from "express";
import {
  create,
  list,
  listForOwner,
  getOne,
  updateTurfDetails,
  turfInputValidation,
  validateUpdateTurfInput,
  updateTurfImages,
  updateTurfDocuments,
  listTurfsForHome,
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

router.route("/list-for-home").get(listTurfsForHome);

router.route("/:id").get(verifyJWT, getOne);

router
  .route("/change-images/:id")
  .put(
    verifyJWT,
    authorizeRole(["owner", "admin"]),
    upload.any(),
    updateTurfImages
  );

router
  .route("/change-documents/:id")
  .put(
    verifyJWT,
    authorizeRole(["owner", "admin"]),
    upload.any(),
    updateTurfDocuments
  );

router
  .route("/:id")
  .put(
    verifyJWT,
    validateUpdateTurfInput,
    authorizeRole(["owner", "admin"]),
    updateTurfDetails
  );

export default router;
