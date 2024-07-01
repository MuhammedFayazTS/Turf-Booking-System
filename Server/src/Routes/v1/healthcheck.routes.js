import { Router } from "express";
import { healthcheck } from "../../Controllers/v1/healthcheck.controllers.js";

const router = Router();

router.route("/").get(healthcheck);

export default router;
