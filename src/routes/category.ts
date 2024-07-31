import express from "express";
import {
  validate,
  validCategory,
  validParamsUserId,
  validParamsCategoryId,
} from "../validate";
import { createCategory, getCategories, deleteCategory } from "../controllers";

const router = express.Router();

router.post("/", validate(validCategory), createCategory);
router.get("/:userId", validate(validParamsUserId), getCategories);

router.delete("/:categoryId", validate(validParamsCategoryId), deleteCategory);

export default router;
