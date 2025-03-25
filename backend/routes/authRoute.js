import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  updateCart,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();
// register
router.post("/register", registerController);
// login
router.post("/login", loginController);
//forget || post
router.post("/forgot-password", forgetPasswordController);
// test
router.get("/test", requireSignIn, isAdmin, testController);

// protected-user routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// protected-admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// update-profile

router.put("/profile", requireSignIn, updateProfileController);
// orders
router.get("/orders", requireSignIn, getOrdersController);
// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
router.put("/cart-update",requireSignIn,updateCart)
export default router;
