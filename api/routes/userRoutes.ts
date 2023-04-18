import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";
import {
  authenticateUser,
  authorizePremmisions,
} from "../middleware/authentication";

const router = Router();

router
  .route("/")
  .get(authenticateUser, authorizePremmisions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

export default router;
