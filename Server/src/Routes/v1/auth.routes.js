import { Router } from "express";

const router = Router();

// import controllers
import { signup,signUpValidate } from "../../Controllers/v1/auth.controller.js";

// routes
router.post("/sign-up",signUpValidate, signup);

export default router;
