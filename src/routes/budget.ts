import express from "express";
import { validate, validBudget } from "../validate";
import { createBudget } from "../controllers";

const router = express.Router();

// TODO: need to add middleware for authorization by access token. Only creator can delete it.
router.post("/", validate(validBudget), createBudget);

export default router;
