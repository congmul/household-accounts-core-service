import { Request, Response } from "express";
import { BudgetMgs, ErrorMsg } from "../config/msgs";
import { budgetService, userService } from "../services";
import logger from "../utils/logger";

export const createBudget = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = userService.checkExist(userId);
    if (!isUser) {
      return res
        .status(404)
        .send({ message: "User not found", statusCode: 404 });
    }

    await budgetService.createBudget(req.body);

    res.status(201).send(BudgetMgs.create);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};
