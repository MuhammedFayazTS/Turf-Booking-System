import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { attachUserId } from "../../middlewares/attachuserid.middleware.js";

const router = Router();

// import controllers
import {
  changeUserRole,
  list,
  getOne,
  getLoggedInUser,
  changeUserPassword,
  updateUserDetails,
  updateUserImage,
  destroy,
  getUnseenNotifications,
  getNotificationDetails,
  getSeenNotifications,
  markNotificationAsSeen,
  markNotificationsAsSeen,
  deleteNotification,
  deleteNotifications,
} from "../../Controllers/v1/user.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

//secured routes
router.route("/role/:id").put(verifyJWT, attachUserId, changeUserRole);
router.route("/list").get(verifyJWT, list);
router.route("/notification/unseen").get(verifyJWT, getUnseenNotifications);
router.route("/notification/seen").get(verifyJWT, getSeenNotifications);
router.route("/notification/:id").get(verifyJWT, getNotificationDetails);
router.route("/notification/:id").put(verifyJWT, markNotificationAsSeen);
router.route("/notifications").put(verifyJWT, markNotificationsAsSeen);
router.route("/notification/:id").delete(verifyJWT, deleteNotification);
router.route("/notifications").delete(verifyJWT, deleteNotifications);
router.route("/").get(verifyJWT, getLoggedInUser);
router.route("/change-password").put(verifyJWT, changeUserPassword);
router.route("/change-image").put(verifyJWT, upload.any(), updateUserImage);
router.route("/").put(verifyJWT, updateUserDetails);
router.route("/:id").get(verifyJWT, getOne);
router.route("/").delete(verifyJWT, attachUserId, destroy);

export default router;
