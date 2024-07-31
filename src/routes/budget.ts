import express from "express";
import {
  validate,
  validBudget,
  validGetBudget,
  validUpdateBudget,
  validDeleteBudget,
} from "../validate";
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers";

const router = express.Router();

// TODO: need to add middleware for authorization by access token. Only creator can delete it.
router.post("/", validate(validBudget), createBudget);
router.get("/:userId", validate(validGetBudget), getBudgets);
router.patch("/:budgetId", validate(validUpdateBudget), updateBudget);
router.delete("/:budgetId", validate(validDeleteBudget), deleteBudget);

export default router;
