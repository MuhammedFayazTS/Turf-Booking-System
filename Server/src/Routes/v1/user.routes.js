import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";

const router = Router();

// import controllers
import { changeUserRole,list,getOne,getLoggedInUser } from "../../Controllers/v1/user.controller.js";

//secured routes
router.route("/role/:id").put(verifyJWT, attachUserId, changeUserRole);
router.route("/list").get(verifyJWT, list);
router.route("/").get(verifyJWT, getLoggedInUser);
router.route("/:id").get(verifyJWT, getOne);

export default router;
