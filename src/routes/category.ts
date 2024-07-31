import express from "express";
import {
  validate,
  validCategory,
  validParamsUserId,
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

router.post("/", validate(validCategory), createCategory);
router.get("/:userId", validate(validParamsUserId), getCategories);
router.patch("/:categoryId", validate(validUpdateCategory), updateCategory);
router.delete("/:categoryId", validate(validParamsCategoryId), deleteCategory);

export default router;
