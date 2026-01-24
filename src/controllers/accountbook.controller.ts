import { Request, Response } from "express";
import { SuccessMsg, ErrorMsg } from "../config/msgs";
import { accountbookService, userService } from "../services";
import logger from "../utils/logger";

export const getAccountBooks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    const result = await accountbookService.getAccountbooks(userId);
    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    if (err.statusCode && err.statusCode !== 500) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(500).send(err);
  }
};

export const createAccountBook = async (req: Request, res: Response) => {
  try {
    const { name, description, userId } = req.body;

    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    const result = await accountbookService.createAccountbook({
      name,
      description,
      userId,
    });
    res.status(201).send({ ...SuccessMsg.create("AccountBook"), result });
  } catch (err: any) {
    logger.error(err);
    if (err.statusCode && err.statusCode !== 500) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(500).send(err);
  }
};

export const setDefaultAccountBook = async (req: Request, res: Response) => {
  try {
    const { userId, accountBookId } = req.params;
    const result = await accountbookService.setDefaultAccountBook(
      userId,
      accountBookId,
    );
    res
      .status(200)
      .send({ ...SuccessMsg.update("Default AccountBook"), result });
  } catch (err: any) {
    logger.error(err);
    if (err.statusCode && err.statusCode !== 500) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    res.status(500).send(err);
  }
};

export const deleteAccountBook = async (req: Request, res: Response) => {
  try {
    const { userId, accountBookId } = req.params;
    const result = await accountbookService.deleteAccountBook(
      userId,
      accountBookId,
    );
    res.status(200).send({ ...SuccessMsg.delete("AccountBook"), result });
  } catch (err: any) {
    logger.error(err);
    if (err.statusCode && err.statusCode !== 500) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

export const beginningMonthCheck = async (req: Request, res: Response) => {
  try {
    const { accountBookId } = req.params;
    const result = await accountbookService.beginningMonthCheck(accountBookId);
    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    if (err.statusCode && err.statusCode !== 500) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

export const updateBeginningMonthCheck = async (
  req: Request,
  res: Response,
) => {
  try {
    const { accountBookId } = req.params;
    const { date, checkList } = req.body;
    const result = await accountbookService.updateBeginningMonthCheck(
      accountBookId,
      date,
      checkList,
    );
    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    if (err.statusCode && err.statusCode !== 500) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};
