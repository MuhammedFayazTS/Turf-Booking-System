import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

// import controllers
import {
  signUp,
  signUpValidate,
  signIn,
  signInValidate,
  signOut,
  refreshAccessToken,
  protectedRoute,
} from "../../Controllers/v1/auth.controller.js";

// routes
router.route("/sign-up").post(upload.any(), signUpValidate, signUp);
router.route("/sign-in").post(signInValidate, signIn);
router.route("/refresh-token").post(refreshAccessToken);

//secured routes
router.route("/sign-out").post(verifyJWT, signOut);
router.route("/protected").post(verifyJWT, protectedRoute);

export default router;
