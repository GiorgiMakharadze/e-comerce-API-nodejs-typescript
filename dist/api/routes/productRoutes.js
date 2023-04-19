"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authentication_1 = require("../middleware/authentication");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
router
    .route("/")
    .post([authentication_1.authenticateUser, (0, authentication_1.authorizePremmisions)("admin")], productController_1.createProduct)
    .get(productController_1.getAllProducts);
router
    .route("/uploadImage")
    .post([authentication_1.authenticateUser, (0, authentication_1.authorizePremmisions)("admin")], productController_1.uploadImage);
router
    .route("/:id")
    .get(productController_1.getSingleProduct)
    .patch([authentication_1.authenticateUser, (0, authentication_1.authorizePremmisions)("admin")], productController_1.updateProduct)
    .delete([authentication_1.authenticateUser, (0, authentication_1.authorizePremmisions)("admin")], productController_1.deleteProduct);
router.route("/:id/reviews").get(reviewController_1.getSingleProductReviews);
exports.default = router;
