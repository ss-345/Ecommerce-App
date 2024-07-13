import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
//register-post
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // console.log(req.body);
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }
    //existinguser
    const existingUser = await userModel.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }
    //newuser
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(200).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something error in registration",
      error,
    });
  }
};

//login-post

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const hashedPassword = user.password;
    const match = await comparePassword(password, hashedPassword);
    // console.log(match);
    if (!match) {
      res.status(200).send({
        success: false,
        message: "Wrong Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something error in login",
      error,
    });
  }
};

export const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({
        message: "Email is required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        message: "NewPassword is required",
      });
    }
    // check

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        message: "Wrong email or answer",
      });
    }

    const hpassword = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, {
      password: hpassword,
    });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log("Forget password error", error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Test route is called");
};

// update-profile

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashed = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,

        password: hashed || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    return res.status(200).send({
      success: "true",
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: "false",
      message: "Error getting during updating the profile",
      error,
    });
  }
};

// get orders

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: "false",
      message: "Error while during getting orders",
      error,
    });
  }
};
// get-all-orders

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: "false",
      message: "Error while during getting orders",
      error,
    });
  }
};

// order-status

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
