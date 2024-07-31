import express from "express";
import { validate, validCategory, validGetCategory } from "../validate";
import { createCategory, getCategories } from "../controllers";

const router = express.Router();

router.post("/", validate(validCategory), createCategory);
router.get("/:userId", validate(validGetCategory), getCategories);

export default router;
