import express from "express";
import { validate, validCategory } from "../validate";
import { createCategory } from "../controllers";

const router = express.Router();

router.post("/", validate(validCategory), createCategory);

export default router;
