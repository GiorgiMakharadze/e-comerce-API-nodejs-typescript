"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderContollers_1 = require("../controllers/orderContollers");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(authentication_1.authenticateUser, orderContollers_1.createOrder)
    .get(authentication_1.authenticateUser, (0, authentication_1.authorizePremmisions)("admin"), orderContollers_1.getAllOrders);
router.route("/showAllMyOrders").get(authentication_1.authenticateUser, orderContollers_1.getCurrentUserOrders);
router
    .route("/:id")
    .get(authentication_1.authenticateUser, orderContollers_1.getSingleOrder)
    .patch(authentication_1.authenticateUser, orderContollers_1.updateOrder);
exports.default = router;
