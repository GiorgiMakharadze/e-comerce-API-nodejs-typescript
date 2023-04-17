"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.route("/").get(userController_1.getAllUsers);
router.route("/showMe").get(userController_1.showCurrentUser);
router.route("/updateUser").patch(userController_1.updateUser);
router.route("/updateUserPassword").patch(userController_1.updateUserPassword);
router.route("/:id").get(userController_1.getSingleUser);
exports.default = router;