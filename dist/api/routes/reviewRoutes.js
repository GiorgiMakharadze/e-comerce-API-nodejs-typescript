"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.route("/").post(authentication_1.authenticateUser, reviewController_1.createReview).get(reviewController_1.getAllReviews);
router
    .route("/:id")
    .get(reviewController_1.getSingleReview)
    .patch(authentication_1.authenticateUser, reviewController_1.updateReview)
    .delete(authentication_1.authenticateUser, reviewController_1.deleteReview);
exports.default = router;
