import express from "express";
import { validate, validBudget, validGetBudget } from "../validate";
import { createBudget, getBudgets } from "../controllers";

const router = express.Router();

// TODO: need to add middleware for authorization by access token. Only creator can delete it.
router.post("/", validate(validBudget), createBudget);
router.get("/:userId", validate(validGetBudget), getBudgets);

export default router;
