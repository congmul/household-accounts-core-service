import express from "express";
import { getAccountbooks } from "../controllers/accountbook.controller";

const router = express.Router();

router.get("/:userId", getAccountbooks);

export default router;
