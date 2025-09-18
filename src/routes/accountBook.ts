import express from "express";
import {
  getAccountBooks,
  createAccountBook,
  setDefaultAccountBook,
  deleteAccountBook,
} from "../controllers/accountBook.controller";

const router = express.Router();

router.get("/:userId", getAccountBooks);
router.post("/", createAccountBook);
router.patch("/set-default/:userId/:accountBookId", setDefaultAccountBook);
router.delete("/:userId/:accountBookId", deleteAccountBook);

export default router;
