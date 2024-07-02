import { Router } from "express";

const router = Router();

// import controllers
import { signup } from "../../Controllers/v1/auth.controller.js";

// routes
router.post("/sign-up", signup);

export default router;
