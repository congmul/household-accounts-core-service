import express from "express";
import { validate, validTransaction, validGetTransaction } from "../validate";
import { createTransaction, getTransactions } from "../controllers";

const router = express.Router();

router.post("/", validate(validTransaction), createTransaction);
router.get("/:userId", validate(validGetTransaction), getTransactions);

export default router;
