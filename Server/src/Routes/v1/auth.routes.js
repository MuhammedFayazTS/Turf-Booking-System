import { Router } from "express";

const router = Router();

// import controllers
import { signup,validate } from "../../Controllers/v1/auth.controller.js";

// routes
router.post("/sign-up",validate, signup);

export default router;
