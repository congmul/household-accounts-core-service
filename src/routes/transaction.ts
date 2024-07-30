import express from "express";
import {
  validate,
  validTransaction,
  validGetTransaction,
  validPatchTransaction,
  validDeleteTransaction,
} from "../validate";
import {
  createTransaction,
  getTransactions,
  patchTransaction,
  deleteTransaction,
} from "../controllers";

const router = express.Router();

// TODO: need to add middleware for authorization by access token. Only creator can delete it.

router.post("/", validate(validTransaction), createTransaction);
router.get("/:userId", validate(validGetTransaction), getTransactions);
router.patch(
  "/:transactionId",
  validate(validPatchTransaction),
  patchTransaction,
);
router.delete(
  "/:transactionId",
  validate(validDeleteTransaction),
  deleteTransaction,
);

export default router;
