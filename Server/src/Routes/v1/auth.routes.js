import { Router } from "express";

const router = Router();

// import controllers
import {
  signUp,
  signUpValidate,
  signIn,
  signInValidate,
  signOut,
  refreshAccessToken,
} from "../../Controllers/v1/auth.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

// routes
router.route("/sign-up").post(signUpValidate, signUp);
router.route("/sign-in").post(signInValidate, signIn);

//secured routes
router.route("/sign-out").post(verifyJWT, signOut);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
