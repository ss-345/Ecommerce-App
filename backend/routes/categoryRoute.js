import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryControlletr,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();

// create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update-category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// All category

router.get("/get-category", categoryControlletr);

// single-category

router.get("/single-category/:slug", singleCategoryController);

// delete-category

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
