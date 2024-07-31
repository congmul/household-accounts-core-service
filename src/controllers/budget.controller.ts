import { Request, Response } from "express";
import { SuccessMsg, ErrorMsg } from "../config/msgs";
import { budgetService, userService } from "../services";
import logger from "../utils/logger";

export const createBudget = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    await budgetService.createBudget(req.body);

    res.status(201).send(SuccessMsg.create("budget"));
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};
export const getBudgets = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    const { year, month } = req.query;
    const result = await budgetService.getBudgets(
      userId,
      parseInt(year as string),
      parseInt(month as string),
    );
    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};
