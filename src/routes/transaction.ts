import express from "express";
import {
  validate,
  validTransaction,
  validGetTransaction,
  validPatchTransaction,
} from "../validate";
import {
  createTransaction,
  getTransactions,
  patchTransaction,
} from "../controllers";

const router = express.Router();

router.post("/", validate(validTransaction), createTransaction);
router.get("/:userId", validate(validGetTransaction), getTransactions);
router.patch(
  "/:transactionId",
  validate(validPatchTransaction),
  patchTransaction,
);

export default router;
