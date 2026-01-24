import express from "express";
import {
  getAccountBooks,
  createAccountBook,
  setDefaultAccountBook,
  deleteAccountBook,
  beginningMonthCheck,
  updateBeginningMonthCheck,
} from "../controllers/accountbook.controller";

const router = express.Router();

router.get("/:userId", getAccountBooks);
router.post("/", createAccountBook);
router.patch("/set-default/:userId/:accountBookId", setDefaultAccountBook);
router.delete("/:userId/:accountBookId", deleteAccountBook);
router.get("/beginningMonthCheck/:accountBookId", beginningMonthCheck);
router.patch("/beginningMonthCheck/:accountBookId", updateBeginningMonthCheck);

export default router;
