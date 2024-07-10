import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";

const router = Router();

// import controllers
import {
  changeUserRole,
  list,
  getOne,
  getLoggedInUser,
  changeUserPassword,
  updateUserDetails,
  updateUserImage,
} from "../../Controllers/v1/user.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

//secured routes
router.route("/role/:id").put(verifyJWT, attachUserId, changeUserRole);
router.route("/list").get(verifyJWT, list);
router.route("/").get(verifyJWT, getLoggedInUser);
router.route("/change-password").put(verifyJWT, changeUserPassword);
router.route("/change-image").put(verifyJWT, upload.any(), updateUserImage);
router.route("/").put(verifyJWT, updateUserDetails);
router.route("/:id").get(verifyJWT, getOne);

export default router;
