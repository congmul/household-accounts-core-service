import express from "express";
import {
  validate,
  validCategory,
  validGetCategory,
  validSubCategory,
  validParamsCategoryId,
  validUpdateCategory,
} from "../validate";
import {
  createCategory,
  createSubcategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers";

const router = express.Router();

// TODO: need to add middleware for authorization by access token. Only creator can delete it.
router.post("/", validate(validCategory), createCategory);
router.get("/:userId", validate(validGetCategory), getCategories);
router.post(
  "/:categoryId/subcategory",
  validate(validSubCategory),
  createSubcategory,
);
router.patch("/:categoryId", validate(validUpdateCategory), updateCategory);
router.delete("/:categoryId", validate(validParamsCategoryId), deleteCategory);

export default router;
