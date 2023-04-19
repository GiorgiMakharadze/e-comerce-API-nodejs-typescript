import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../controllers/productController";
import {
  authenticateUser,
  authorizePremmisions,
} from "../middleware/authentication";
import { getSingleProductReviews } from "../controllers/reviewController";

const router = Router();

router
  .route("/")
  .post([authenticateUser, authorizePremmisions("admin")], createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePremmisions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePremmisions("admin")], updateProduct)

  .delete([authenticateUser, authorizePremmisions("admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

export default router;
