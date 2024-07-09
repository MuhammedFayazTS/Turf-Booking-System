import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";

const router = Router();

// import controllers
import { changeUserRole,list } from "../../Controllers/v1/user.controller.js";

//secured routes
router.route("/role/:id").put(verifyJWT, attachUserId, changeUserRole);
router.route("/list").get(verifyJWT, list);

export default router;
