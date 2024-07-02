import { Router } from "express";

const router = Router();

// import controllers
import { signUp,signUpValidate,signIn,signInValidate } from "../../Controllers/v1/auth.controller.js";

// routes
router.post("/sign-up",signUpValidate, signUp);
router.post("/sign-in",signInValidate, signIn);

export default router;
