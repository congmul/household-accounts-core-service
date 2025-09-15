import { Request, Response } from "express";
import { SuccessMsg, ErrorMsg } from "../config/msgs";
import { accountbookService, userService } from "../services";
import logger from "../utils/logger";

export const getAccountbooks = async (req: Request, res: Response) => {
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
    res.status(500).send(err);
  }
};
