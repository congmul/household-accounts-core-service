import express from "express";
import {
  validate,
  validCategory,
  validGetCategory,
  validParamsCategoryId,
  validUpdateCategory,
} from "../validate";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers";

const router = express.Router();

// TODO: need to add middleware for authorization by access token. Only creator can delete it.
router.post("/", validate(validCategory), createCategory);
router.get("/:userId", validate(validGetCategory), getCategories);
router.patch("/:categoryId", validate(validUpdateCategory), updateCategory);
router.delete("/:categoryId", validate(validParamsCategoryId), deleteCategory);

export default router;
