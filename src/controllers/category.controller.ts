import { Request, Response } from "express";
import { CategoryMgs, ErrorMsg } from "../config/msgs";
import { categoryService, userService } from "../services";
import logger from "../utils/logger";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ message: "User not found" });
    }

    await categoryService.createCategory(req.body);

    res.status(201).send(CategoryMgs.create);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
  }
};
