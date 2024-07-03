import { Router } from "express";

const router = Router();

// import controllers
import { signUp,signUpValidate,signIn,signInValidate,signOut } from "../../Controllers/v1/auth.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

// routes
router.post("/sign-up",signUpValidate, signUp);
router.post("/sign-in",signInValidate, signIn);

//secured routes
router.post("/sign-out",verifyJWT, signOut);

export default router;
