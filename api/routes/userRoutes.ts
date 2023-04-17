import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";

const router = Router();

router.route("/").get(getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);

router.route("/:id").get(getSingleUser);

export default router;
