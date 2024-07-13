import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required here" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "This category already exist",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    return res.status(200).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required here" });
    }
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category update done sucessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category",
      error,
    });
  }
};

export const categoryControlletr = async (req, res) => {
  try {
    const allCategory = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "All category",
      allCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting category",
      error,
    });
  }
};
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Getting single category sucessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single category",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id is:", id);
    await categoryModel.findByIdAndDelete(id);
    // const category = await categoryModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "category delete done sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting category",
      error,
    });
  }
};
