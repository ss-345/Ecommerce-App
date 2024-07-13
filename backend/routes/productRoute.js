import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  getProductController,
  productCategoryController,
  productCountController,
  productDeleteController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// cretate-product

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// getall-products

router.get("/get-product", getProductController);

// single-product

router.get("/get-product/:slug", singleProductController);

// get photo

router.get("/product-photo/:pid", productPhotoController);

// delete photo

router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  productDeleteController
);

// update-product

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter-product

router.post("/product-filters", productFiltersController);

// product-count
router.get("/product-count", productCountController);

// product per page function

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

// similar-product

router.get("/related-product/:pid/:cid", relatedProductController);

// category-wise-product-output

router.get("/product-category/:slug", productCategoryController);
export default router;

// payment route
// token
router.get("/braintree/token", braintreeTokenController);
// payments

router.post("/braintree/payment", requireSignIn, braintreePaymentController);
